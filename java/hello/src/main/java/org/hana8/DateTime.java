package org.hana8;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Period;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

public class DateTime {
	public static void main(String[] args) {
		LocalDate nowLd = LocalDate.now();
		System.out.println("nowLd = " + nowLd);
		LocalTime nowLt = LocalTime.now();
		System.out.println("nowLt = " + nowLt);
		LocalDateTime now = LocalDateTime.now();
		System.out.println("now = " + now);

		LocalDate graduation = LocalDate.of(2026, 9, 19);
		System.out.println("graduation = " + graduation);

		LocalDateTime ldt = LocalDateTime.of(2026, 3, 1, 14, 0, 0); // ldt.getHour(), ldt.getMinutes(), …
		System.out.println(LocalDateTime.now().isAfter(ldt)); // cf. isBefore(), equals()

		// for (String zone : ZoneId.getAvailableZoneIds()) {
		// 	ZoneId zoneId = ZoneId.of(zone);
		// 	if (zoneId.toString().contains("Europe"))
		// 		System.out.println(zoneId + " => " + zoneId.getRules());
		// }

		ZoneId rome = ZoneId.of("Europe/Rome");
		System.out.println("rome= " + rome + '>' + rome.getRules());
		ZoneId newyork = ZoneId.of("America/New_York");
		System.out.println("newyork = " + newyork + '>' + newyork.getRules());

		LocalDateTime ldt2 = LocalDateTime.of(2026, 8, 1, 14, 0, 0); // ldt.getHour(), ldt.getMinutes(), …

		// LocalDateTime에 zone 이 붙어있는것!
		ZonedDateTime zonedDateTime = ZonedDateTime.of(ldt2, newyork);
		boolean isNYDST = newyork.getRules().isDaylightSavings(zonedDateTime.toInstant());
		System.out.println("isNYDST = " + isNYDST);

		ZoneId seoul = ZoneId.systemDefault();
		ZonedDateTime zonedDateTime1 = ZonedDateTime.of(ldt2, seoul);
		boolean isSeoutDST = seoul.getRules().isDaylightSavings(zonedDateTime1.toInstant());
		System.out.println("isSeoutDST = " + isSeoutDST);

		Instant iNow = Instant.now();
		System.out.println("iNow = " + iNow);
		DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 E요일"); // now.format(fmt)
		System.out.println(ldt.format(fmt));
		Instant epoch = Instant.ofEpochSecond(0);

		LocalDate ldStart = LocalDate.of(2025, 10, 28);
		LocalDateTime ldtStart = LocalDateTime.of(2025, 10, 28, 9, 0, 0);
		System.out.println("ldtStart = " + ldtStart);

		Period dtDate = Period.between(ldStart, LocalDate.now()); // 년 월 일까지만!!
		System.out.println("dtDate = " + dtDate);
		System.out.printf("%d년 %d월 %d일%n", dtDate.getYears(), dtDate.getMonths(), dtDate.getDays());
		Duration dDate = Duration.between(ldtStart, LocalDateTime.now());
		System.out.println("dDate = " + dDate.getSeconds() / 86400); // Duration은 초로만 바꿀 수 있음
		System.out.println("dDate = " + dDate.getSeconds() % 86400);
		System.out.println("dDate = " + (dDate.getSeconds() % 86400) / 3600);

		long months = ChronoUnit.MONTHS.between(ldtStart, LocalDateTime.now());
		System.out.println("days = " + months);
		long days = ChronoUnit.DAYS.between(ldtStart, LocalDateTime.now());
		System.out.println("days = " + days);
		long hours = ChronoUnit.HOURS.between(ldtStart, LocalDateTime.now()); // 토탈 기간(월,일,시)을 구할때 용이!! 위에 period 보다 간편함
		System.out.println("hours = " + hours);

	}
}
