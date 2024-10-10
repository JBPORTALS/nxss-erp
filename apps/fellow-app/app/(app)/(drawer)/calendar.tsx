import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { Calendar, CalendarUtils, DateData } from "react-native-calendars";
import { Drawer } from "expo-router/drawer";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react-native";

import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { H4 } from "~/components/ui/typography";
import { NAV_THEME } from "~/lib/constants";
import { cn } from "~/lib/utils";
import { api } from "~/utils/api";

const INITIAL_DATE = new Date().toISOString().split("T")[0]; // Today's date

export default function CalendarScreen() {
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [markedDates, setMarkedDates] = useState({});

  const {
    data: events,
    isLoading,
    refetch,
  } = api.calendar.getStudentEvents.useQuery({
    date: new Date(selected),
  });

  // console.log(events);

  useEffect(() => {
    refetch();
  }, [selected, refetch]);

  useEffect(() => {
    if (events) {
      const newMarkedDates = {
        [selected]: {
          marked: events.length > 0,
          dotColor: NAV_THEME.light.primary,
          selected: true,
          selectedColor: NAV_THEME.light.primary,
        },
      };
      setMarkedDates(newMarkedDates);
    }
  }, [events, selected]);

  const onDayPress = useCallback((day: DateData) => {
    setSelected(day.dateString);
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Drawer.Screen
        options={{
          drawerIcon: (props) => <CalendarDays {...props} size={20} />,
          drawerLabel: "Calendar",
          title: "Calendar",
        }}
      />
      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        enableSwipeMonths
        theme={{
          backgroundColor: NAV_THEME.light.background,
          calendarBackground: NAV_THEME.light.background,
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: NAV_THEME.light.primary,
          selectedDayTextColor: "#ffffff",
          todayTextColor: NAV_THEME.light.primary,
          dayTextColor: NAV_THEME.light.text,
          textDisabledColor: "#b6c1cd",
          dotColor: NAV_THEME.light.primary,
          selectedDotColor: "#ffffff",
          arrowColor: NAV_THEME.light.primary,
          monthTextColor: NAV_THEME.light.text,
          indicatorColor: NAV_THEME.light.primary,
          textDayFontFamily: "GeistVF",
          textMonthFontFamily: "GeistVF",
          textDayHeaderFontFamily: "GeistMonoVF",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 14,
        }}
      />
      {isLoading ? (
        <View className="flex h-full w-full items-center py-20">
          <ActivityIndicator size={32} color={NAV_THEME.light.primary} />
        </View>
      ) : events && events.length > 0 ? (
        <View className="gap-4 px-6 py-5">
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Events for {new Date(selected).toLocaleDateString()}
          </Text>
          {events.map((event, index) => (
            <Card
              key={index}
              className={cn(
                "rounded-xl bg-secondary",
                !event.isSlotStart && "rounded-l-none border-l-4",
                !event.isSlotEnd && "rounded-r-none border-r-4",
              )}
              style={{
                borderLeftColor: "red",
              }}
            >
              <CardHeader className="flex-row items-center justify-between">
                <View className="w-full flex-shrink">
                  <CardTitle className="w-full text-base">
                    {event.title.slice(0, 80)}
                  </CardTitle>
                  <CardDescription>{event.formattedTime}</CardDescription>
                </View>
                <Badge className="" variant={"outline"}>
                  <Text
                    className={cn(
                      "text-sm capitalize",
                      event.event_type === "event" && "text-primary",
                      event.event_type === "holiday" && "text-green-600",
                      event.event_type === "opportunity" && "text-blue-600",
                    )}
                  >
                    {event.event_type}
                  </Text>
                </Badge>
              </CardHeader>
            </Card>
          ))}
        </View>
      ) : (
        <View className="flex h-full w-full items-center py-20">
          <H4>No events for the day</H4>
        </View>
      )}
    </ScrollView>
  );
}
