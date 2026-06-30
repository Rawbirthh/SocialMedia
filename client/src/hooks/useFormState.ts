import { useState } from 'react';

interface UseFormStateOptions {
  onSuccess?: () => void;
}

export function useFormState({ onSuccess }: UseFormStateOptions = {}) {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async <T>(e: React.FormEvent, submitFn: () => Promise<T>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    try {
      await submitFn();
      onSuccess?.();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: Record<string, string[]> } } };
      if (axiosErr.response?.data?.error) {
        setErrors(axiosErr.response.data.error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return { submitting, errors, handleSubmit };
}
