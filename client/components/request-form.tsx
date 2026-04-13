'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  createRequest,
  CreateRequestInput,
  getApiErrorMessage,
} from '@/lib/api';

export function RequestForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateRequestInput>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (values: CreateRequestInput) => {
    try {
      setErrorMessage(null);
      setSuccessMessage(null);
      await createRequest(values);
      reset();
      setSuccessMessage(
        'Your request has been submitted. AI enrichment will appear on the dashboard shortly.',
      );
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      {successMessage ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          {successMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          {errorMessage}
        </div>
      ) : null}

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-800" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          {...register('name', {
            required: 'Please enter your name.',
          })}
        />
        {errors.name ? (
          <p className="text-sm text-rose-700">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-800" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          {...register('email', {
            required: 'Please enter your email address.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address.',
            },
          })}
        />
        {errors.email ? (
          <p className="text-sm text-rose-700">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-800" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          {...register('message', {
            required: 'Please tell us what you need help with.',
            minLength: {
              value: 10,
              message: 'Please enter at least 10 characters.',
            },
          })}
        />
        {errors.message ? (
          <p className="text-sm text-rose-700">{errors.message.message}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isSubmitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Submitting...
          </>
        ) : (
          'Submit request'
        )}
      </button>
    </form>
  );
}
