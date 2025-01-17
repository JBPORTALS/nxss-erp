import { Linking, TouchableNativeFeedback, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { format } from "date-fns";
import { CalendarDaysIcon, MapPinIcon, Paperclip } from "lucide-react-native";

import { H3, Muted, P } from "~/components/ui/typography";
import { cn } from "~/lib/utils";
import { api } from "~/utils/api";

export default function EventDetails() {
  const params = useLocalSearchParams<{ event_id: string }>();
  const event = api.calendar.getEventDetails.useQuery(
    { id: parseInt(params.event_id) },
    { enabled: !!params.event_id },
  );
  return (
    <View>
      <Stack.Screen
        options={{
          presentation: "modal",
          animation: "fade_from_bottom",
          title:
            event.data?.event_type === "holiday"
              ? "Holiday Details"
              : "Event Details",
          headerTitleAlign: "center",
        }}
      />
      <View
        className={cn(
          "h-12 w-full bg-indigo-600",
          event.data?.event_type === "holiday" && "bg-green-600",
        )}
      />
      <View className="gap-4 px-6 py-4">
        <View>
          <H3>{event.data?.title}</H3>
          {event.data?.description && <P>{event.data?.description}</P>}
        </View>
        <View className="flex-row gap-2">
          <CalendarDaysIcon color={"#000"} size={18} />
          {event.data?.start_date && (
            <P>
              {format(
                event.data.start_date,
                `cc, MMM yyyy ${!event.data.is_all_day ? "hh:mm aaa" : ""}`,
              )}
            </P>
          )}
        </View>
        <View className="flex-row gap-2">
          <MapPinIcon color={"#000"} size={18} />
          <P className="leading-tight">
            {event.data?.location ?? "No location details..."}
          </P>
        </View>
        <View className="flex-row gap-2">
          <Paperclip color={"#000"} size={18} />
          <TouchableNativeFeedback
            onPress={() =>
              event.data?.attachment_url &&
              Linking.openURL(event.data?.attachment_url)
            }
          >
            {event.data?.attachment_url ? (
              <P className="font-semibold leading-tight text-indigo-600">
                View Pdf File
              </P>
            ) : (
              <Muted>No Attachments...</Muted>
            )}
          </TouchableNativeFeedback>
        </View>
      </View>
    </View>
  );
}
