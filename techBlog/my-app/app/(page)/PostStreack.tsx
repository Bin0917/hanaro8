'use client';
import {
  type Activity,
  ActivityCalendar,
  type ThemeInput,
} from 'react-activity-calendar';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

// // 타입 정의
// type Activity = {
//   date: string; // YYYY-MM-DD 형식
//   count: number;
//   level: 0 | 1 | 2 | 3 | 4;
// };

type ContributionGraphProps = {
  data: Activity[];
  showWeekdayLabels?: boolean;
  blockSize?: number;
  blockRadius?: number;
  fontSize?: number;
};
// GitHub Green 고정
const greenTheme: ThemeInput = {
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
};

export default function ContributionGraph({
  data,
  showWeekdayLabels = true,
  blockSize = 12,
  blockRadius = 2,
  fontSize = 12,
}: ContributionGraphProps) {
  return (
    <div className="flex w-full justify-center rounded-md border p-5 shadow-2xs">
      <ActivityCalendar
        data={data}
        theme={greenTheme}
        showWeekdayLabels={showWeekdayLabels}
        blockSize={blockSize}
        blockRadius={blockRadius}
        fontSize={fontSize}
        renderBlock={(block: React.ReactNode, activity: Activity) => (
          <g
            data-tooltip-id="activity-tooltip"
            data-tooltip-content={`${activity.count}개 게시글 - ${activity.date}`}
          >
            {block}
          </g>
        )}
      />
      <ReactTooltip id="activity-tooltip" />
    </div>
  );
}
