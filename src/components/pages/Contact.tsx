import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('submitting');

    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-3">Contact Us</h1>
        <p className="text-gray-600">
          Have a question or feedback? We'd love to hear from you. Fill out the form below and
          we'll get back to you as soon as possible.
        </p>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
            placeholder="Your full name"
            required
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
            placeholder="your.email@example.com"
            required
          />

          <Textarea
            label="Message"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            error={errors.message}
            placeholder="Tell us what's on your mind..."
            rows={6}
            required
          />

          {/* Success Message */}
          {status === 'success' && (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-700">
                Thank you for your message! We'll get back to you soon.
              </p>
            </div>
          )}

          {/* Error Message */}
          {status === 'error' && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700">
                Something went wrong. Please try again later.
              </p>
            </div>
          )}

          <div className="flex items-center justify-end gap-4">
            <Button
              type="submit"
              variant="primary"
              disabled={status === 'submitting'}
              className="flex items-center gap-2"
            >
              {status === 'submitting' ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Additional Contact Info */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-gray-900 mb-3">Other Ways to Reach Us</h3>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Email:</span>{' '}
            <a
              href="mailto:support@syncnotes.com"
              className="text-[#14b8a6] hover:underline focus:outline-none focus:ring-2 focus:ring-[#14b8a6] rounded"
            >
              support@syncnotes.com
            </a>
          </p>
          <p>
            <span className="font-semibold">Response Time:</span> Usually within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}
