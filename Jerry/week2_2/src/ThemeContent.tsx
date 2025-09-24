import clsx from 'clsx';
import { Theme, useTheme } from './context/ThemeProvider';

// 메인 화면 구성
export default function ThemeContent() {
  const { theme } = useTheme();

  const isLightMode = theme === Theme.LIGHT;

  return (
    <div
      className={clsx(
        'p-6 min-h-dvh w-full',
        isLightMode ? 'bg-white' : 'bg-gray-800'
      )}
    >
      <h1
        className={clsx(
          'text-wxl pb-4 text-[22px] font-bold',
          isLightMode ? 'text-black' : 'text-white'
        )}
      >
        슬픔이여 안녕 - 잔나비
      </h1>
      <p
        className={clsx(
          'mt-2 whitespace-pre-line',
          isLightMode ? 'text-black' : 'text-white'
        )}
      >
        {`
          이젠 다 잊어 버린 걸
          아니 다 잃어 버렸나
          답을 쫓아 왔는데
          질문을 두고 온거야
          돌아서던 길목이었어
          
          집에 돌아가 누우면
          나는 어떤 표정 지을까
          슬픔은 손 흔들며
          오는 건지 가는 건지
          저 어디쯤에 서 있을 텐데

          "이봐 젊은 친구야
          잃어버린 것들은 잃어버린 그 자리에
          가끔 뒤 돌아 보면은
          슬픔 아는 빛으로 피어-"

          나는 나를 미워하고
          그런 내가 또 좋아지고
          자꾸만 아른대는
          행복이란 단어들에
          몸서리 친 적도 있어요

          "이봐 젊은 친구야
          잃어버린 것들은 잃어버린 그 자리에
          가끔 뒤 돌아 보면은
          슬픔 아는 빛으로 피어"

          "저 봐 손을 흔들잖아
          슬픔이여 안녕- 우우-"

          바람 불었고 눈 비 날렸고
          한 계절 꽃도 피웠고 안녕 안녕

          구름 하얗고 하늘 파랗고
          한 시절 나는 자랐고 안녕 안녕
        `}
      </p>
    </div>
  );
}
