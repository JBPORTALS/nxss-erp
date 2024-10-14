import React from "react";
import { View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { format } from "date-fns";
import { CalendarDaysIcon, MapPinIcon } from "lucide-react-native";

import { H3, Lead, P } from "~/components/ui/typography";
import { api } from "~/utils/api";

export default function EventDetails() {
  const params = useLocalSearchParams<{ event_id: string }>();
  const event = api.calendar.getEventDetails.useQuery(
    { id: parseInt(params.event_id) },
    { enabled: !!params.event_id },
  );
  return (
    <View className="gap-4 px-6 py-4">
      <Stack.Screen
        options={{
          presentation: "modal",
          animation: "fade_from_bottom",
          title: "Event Details",
          headerTitleAlign: "center",
        }}
      />
      <H3>{event.data?.title}</H3>
      {event.data?.description && <P>{event.data?.description}</P>}
      <View className="gap-2">
        <Lead>
          <CalendarDaysIcon color={"#000"} size={14} /> Date & Time
        </Lead>
        {event.data?.start_date && (
          <P>
            {format(
              event.data.start_date,
              `cc, MMM yyyy ${!event.data.is_all_day ? "hh:mm aaa" : ""}`,
            )}
          </P>
        )}
      </View>
      <View className="gap-2">
        <Lead>
          <MapPinIcon color={"#000"} size={14} /> Location
        </Lead>
        <P>{event.data?.location ?? "No location details..."}</P>
      </View>
    </View>
  );
}
