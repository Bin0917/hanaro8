'use client';
import {
  type Activity,
  ActivityCalendar,
  type ThemeInput,
} from 'react-activity-calendar';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

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
    <div className="flex w-full justify-center rounded-md p-5 shadow-md">
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

// type Activity = {
//   date: string;
//   count: number;
// };

// type Props = {
//   data: Activity[];
// };

// export default function ActivityCalendar({ data }: Props) {
//   const map = new Map(data.map((d) => [d.date, d.count]));

//   const colors = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];
//   const getColor = (count: number) => colors[Math.min(count, 4)];

//   // 365일 날짜 배열
//   const today = new Date();
//   const dates = Array.from({ length: 365 }, (_, i) => {
//     const d = new Date(today);
//     d.setDate(d.getDate() - i);
//     return d.toISOString().split('T')[0];
//   }).reverse();

//   return (
//     <div className="flex flex-col justify-center gap-4 rounded-md p-5 shadow-md">
//       {/* 캘린더 그리드 */}
//       <div className="flex justify-center">
//         <div
//           className="grid gap-1"
//           style={{ gridTemplateColumns: 'repeat(53, 1fr)' }}
//         >
//           {dates.map((date) => (
//             <div
//               key={date}
//               title={`${map.get(date) ?? 0}개 - ${date}`}
//               className="h-3 w-3 cursor-pointer rounded hover:ring-2 hover:ring-blue-500"
//               style={{ backgroundColor: getColor(map.get(date) ?? 0) }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* 범례 (Legend) */}
//       <div className="flex items-center justify-center gap-3 text-sm">
//         <span className="text-gray-600">Less</span>
//         {colors.map((color) => (
//           <div key={color} className="flex items-center gap-1">
//             {' '}
//             {/* color를 key로 */}
//             <div
//               className="h-3 w-3 rounded"
//               style={{ backgroundColor: color }}
//             />
//           </div>
//         ))}
//         <span className="text-gray-600">More</span>
//       </div>
//     </div>
//   );
// }
