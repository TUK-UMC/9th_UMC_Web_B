interface DeleteConfirmModalProps {
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const UserDeleteConfirmModal = ({
  message = "정말 탈퇴하시겠습니까?",
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <p className="text-center text-lg font-semibold mb-6 text-gray-800">
          {message}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
          >
            취소
          </button>
          <button
            onClick={() => {
              onConfirm();
              onCancel(); // 확인 후 자동 닫힘
            }}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
