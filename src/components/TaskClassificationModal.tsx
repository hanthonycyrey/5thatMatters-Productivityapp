import { useState } from 'react';

interface TaskClassificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: {
    text: string;
    is_important: boolean;
    is_urgent: boolean;
  }) => void;
}

export function TaskClassificationModal({
  isOpen,
  onClose,
  onSubmit,
}: TaskClassificationModalProps) {
  const [step, setStep] = useState<'text' | 'important' | 'urgent'>('text');
  const [taskText, setTaskText] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  if (!isOpen) return null;

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      setStep('important');
    }
  };

  const handleImportantAnswer = (important: boolean) => {
    setIsImportant(important);
    if (!important) {
      onSubmit({
        text: taskText,
        is_important: false,
        is_urgent: false,
      });
      resetAndClose();
    } else {
      setStep('urgent');
    }
  };

  const handleUrgentAnswer = (urgent: boolean) => {
    onSubmit({
      text: taskText,
      is_important: isImportant,
      is_urgent: urgent,
    });
    resetAndClose();
  };

  const resetAndClose = () => {
    setStep('text');
    setTaskText('');
    setIsImportant(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-[#F5F0E8] border-2 border-[#1A1A1A] p-4 sm:p-8 max-w-lg w-full max-h-dvh overflow-y-auto">
        {step === 'text' && (
          <form onSubmit={handleTextSubmit}>
            <h2 className="heading-serif text-2xl sm:text-3xl mb-4 sm:mb-6">
              What must get done today?
            </h2>
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="Describe the task..."
              className="w-full bg-transparent border-b-2 border-[#1A1A1A] p-2 text-mono text-sm sm:text-base focus:outline-none focus:border-[#2D5016]"
              autoFocus
            />
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
              <button
                type="submit"
                className="flex-1 bg-[#2D5016] text-[#F5F0E8] py-3 sm:py-3 text-mono text-sm sm:text-base hover:opacity-90 active:opacity-75 transition-opacity min-h-[44px] sm:min-h-[auto]"
              >
                Next
              </button>
              <button
                type="button"
                onClick={resetAndClose}
                className="px-4 sm:px-6 border-2 border-[#1A1A1A] py-3 sm:py-3 text-mono text-sm sm:text-base hover:bg-[#1A1A1A] hover:text-[#F5F0E8] active:bg-[#1A1A1A] active:text-[#F5F0E8] transition-colors min-h-[44px] sm:min-h-[auto]"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {step === 'important' && (
          <div>
            <h2 className="heading-serif text-2xl sm:text-3xl mb-3 sm:mb-4">Is this Important?</h2>
            <p className="text-mono text-xs sm:text-sm mb-4 sm:mb-6 opacity-70">
              Important tasks align with your long-term goals and values.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => handleImportantAnswer(true)}
                className="flex-1 bg-[#2D5016] text-[#F5F0E8] py-3 sm:py-4 text-mono text-sm sm:text-base hover:opacity-90 active:opacity-75 transition-opacity min-h-[44px] sm:min-h-[auto]"
              >
                Yes
              </button>
              <button
                onClick={() => handleImportantAnswer(false)}
                className="flex-1 border-2 border-[#1A1A1A] py-3 sm:py-4 text-mono text-sm sm:text-base hover:bg-[#1A1A1A] hover:text-[#F5F0E8] active:bg-[#1A1A1A] active:text-[#F5F0E8] transition-colors min-h-[44px] sm:min-h-[auto]"
              >
                No
              </button>
            </div>
          </div>
        )}

        {step === 'urgent' && (
          <div>
            <h2 className="heading-serif text-2xl sm:text-3xl mb-3 sm:mb-4">Is this Urgent?</h2>
            <p className="text-mono text-xs sm:text-sm mb-4 sm:mb-6 opacity-70">
              Urgent tasks demand immediate attention, often driven by external
              pressure.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => handleUrgentAnswer(true)}
                className="flex-1 bg-[#2D5016] text-[#F5F0E8] py-3 sm:py-4 text-mono text-sm sm:text-base hover:opacity-90 active:opacity-75 transition-opacity min-h-[44px] sm:min-h-[auto]"
              >
                Yes
              </button>
              <button
                onClick={() => handleUrgentAnswer(false)}
                className="flex-1 border-2 border-[#1A1A1A] py-3 sm:py-4 text-mono text-sm sm:text-base hover:bg-[#1A1A1A] hover:text-[#F5F0E8] active:bg-[#1A1A1A] active:text-[#F5F0E8] transition-colors min-h-[44px] sm:min-h-[auto]"
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
