package com.example.demo.utils;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

public class DateOperations {

    public static boolean isSameDate(Date date1, Date date2) {

        if (date1 == null || date2 == null) {
            return false;
        }

        LocalDate localDate1 = date1.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate localDate2 = date2.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return localDate1.equals(localDate2);
    }

}
