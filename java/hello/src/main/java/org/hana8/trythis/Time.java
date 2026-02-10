package org.hana8.trythis;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.YearMonth;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

public class Time {
	static final List<LocalDate> holidays = List.of(LocalDate.of(2026, 3, 25));

	public static void main(String[] args) {
		// 나이를 태어난시간기준 시분초로! -> ?
		LocalDateTime birthTime = LocalDateTime.of(2003, 9, 17, 0, 0, 0);
		// LocalDate birthDate = LocalDate.of(2003, 9, 17);
		LocalDate birthDate = birthTime.toLocalDate();
		Duration age = Duration.between(birthTime, LocalDateTime.now());
		Period ageDate = Period.between(birthDate, LocalDate.now());

		System.out.printf("나이 : %d년 %d개월 %d일 %d시 %d분 %d초%n", ageDate.getYears(), ageDate.getMonths(),
			ageDate.getDays(),
			age.toHoursPart(), age.toMinutesPart(), age.toSecondsPart()); //part로 하면 딱딱 맞게 계산해줌 걍 하면 토탈로 구해버림

		// 다음 생일까지 남은 일 수는?

		// 탄생 년월일에서 년도만 증가 (현재 - 탄생) => 올해기준 생일 체킹 가능
		LocalDate nextBirth = birthDate.plusYears(LocalDate.now().getYear() - birthDate.getYear());
		// 올해 생일이 이미 지났다면? 년도 1 증가
		if (nextBirth.isBefore(LocalDate.now())) {
			nextBirth = nextBirth.plusYears(1);
		}
		System.out.println("nextBirth = " + nextBirth);

		System.out.println("2. 다음 생일까지 남은 일: " + ChronoUnit.DAYS.between(LocalDate.now(), nextBirth));

		long leftBday = ChronoUnit.DAYS.between(LocalDate.now(), LocalDate.of(2026, 9, 17));
		System.out.println("leftBday = " + leftBday);

		// 지금 이탈리아 밀라노의 시간은?
		// ZoneId rome = ZoneId.of("Europe/Rome");
		// ZonedDateTime romeTime = ZonedDateTime.now(rome);
		// // getMonth - Febrary, getMonthValue - 2 일케 나옴
		// System.out.printf("%d-%d-%d %d:%d:%d%n", romeTime.getYear(), romeTime.getMonthValue(), romeTime.getDayOfMonth(),
		// 	romeTime.getHour(), romeTime.getMinute(), romeTime.getSecond());

		// 포매터 써도 간단하게 처리 가능
		System.out.println("지금 밀라노 시간: " + ZonedDateTime.now(ZoneId.of("Europe/Rome"))
			.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

		// 다시 해보기 ,, 휴일과 주말을 체크해서 for 돌리기
		// LocalDate sdt = LocalDate.of(2026, 3, 23);
		// LocalDate edt = LocalDate.of(2026, 4, 20);
		//
		// long time = ChronoUnit.DAYS.between(sdt, edt) * 8;
		// long plusTime = ChronoUnit.DAYS.between(LocalDate.of(2026, 4, 13), LocalDate.of(2026, 4, 17));
		// time -= 74;
		// // time -= plusTime * 2;
		// // 64
		// System.out.printf("일할 수 있는 시간: %d%n", time);

		// isAfter 초과 => 12부터 시작해야 13일부터 먹고들어감
		// isBefore 미만 => 21부터 시작해야 20까지 먹어버림
		LocalDate start19_1 = LocalDate.of(2026, 4, 13).minusDays(1);
		LocalDate end19_1 = LocalDate.of(2026, 4, 17).plusDays(1);

		LocalDate start = YearMonth.of(2026, 3).atDay(23);
		LocalDate end = YearMonth.of(2026, 4).atDay(20).plusDays(1);

		int workHour = 0;

		// for문을 date로 돌리는 이 기분.. 좋네요
		for (LocalDate ld = start; ld.isBefore(end); ld = ld.plusDays(1)) {
			if (isWeekendOrHoliday(ld)) {
				continue;
			}

			workHour += (ld.isAfter(start19_1) && ld.isBefore(end19_1)) ? 9 : 8;
		}
		System.out.println("workHour = " + workHour);
	}

	public static boolean isWeekendOrHoliday(LocalDate ld) {
		DayOfWeek dow = ld.getDayOfWeek();
		return dow == DayOfWeek.SATURDAY || dow == DayOfWeek.SUNDAY || holidays.contains(ld);
	}
}
