"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState, useReducer } from "react";
import {
  WeeklySettings,
  WeeklySettingsAction,
  WeeklySettingsActionType,
} from "@/app/model";
import { v4 } from "uuid";
import { da } from "date-fns/locale";

const daysOfWeek: { [key: string]: string }[] = [
  {
    value: "0",
    label: "Sunday",
  },
  {
    value: "1",
    label: "Monday",
  },
  {
    value: "2",
    label: "Tuesday",
  },
  {
    value: "3",
    label: "Wednesday",
  },
  {
    value: "4",
    label: "Thursday",
  },
  {
    value: "5",
    label: "Friday",
  },
  {
    value: "6",
    label: "Saturday",
  },
];

const FormSchemaDefaults = z.object({
  daysOfWeekField: z.string(),
});

function setDefaultTimeSlotValues() {
  const defaultValues: { [key: string]: string } = {};

  daysOfWeek.forEach((day) => {
    defaultValues["timeSlot1From_" + day.value] = new Date("2024-02-06 07:00")
      .toLocaleString()
      .substring(12, 17);
    defaultValues["timeSlot1To_" + day.value] = new Date("2024-02-06 08:30")
      .toLocaleString()
      .substring(12, 17);

    defaultValues["timeSlot2From_" + day.value] = new Date("2024-02-06 09:30")
      .toLocaleString()
      .substring(12, 17);
    defaultValues["timeSlot2To_" + day.value] = new Date("2024-02-06 11:00")
      .toLocaleString()
      .substring(12, 17);

    defaultValues["timeSlot3From_" + day.value] = new Date("2024-02-06 12:00")
      .toLocaleString()
      .substring(12, 17);
    defaultValues["timeSlot3To_" + day.value] = new Date("2024-02-06 13:30")
      .toLocaleString()
      .substring(12, 17);

    defaultValues["timeSlot4From_" + day.value] = new Date("2024-02-06 14:30")
      .toLocaleString()
      .substring(12, 17);
    defaultValues["timeSlot4To_" + day.value] = new Date("2024-02-06 16:00")
      .toLocaleString()
      .substring(12, 17);
  });

  return defaultValues;
}

const initialSettings: WeeklySettings = {
  sunday: null,
  monday: null,
  tuesday: null,
  wednesday: null,
  thursday: null,
  friday: null,
  saturday: null,
};

function reducer(settings: WeeklySettings, action: WeeklySettingsAction) {
  switch (action.type) {
    case "updateDay": {
      return {
        ...settings,
        [action.selectedDay.toLowerCase()]: {
          ...[action.selectedDay.toLowerCase()],
          value: action.daySettings?.value ?? "",
          isDayExluded: action.daySettings?.isDayExcluded ?? false,
        },
      };
    }
  }

  throw Error("Unknown action: " + action.type);
}

function getDay(dayOfWeek: string = "0") {
  return daysOfWeek[parseInt(dayOfWeek)];
}

function getDayOfWeekName(dayOfWeek: string = "0") {
  return daysOfWeek[parseInt(dayOfWeek)].label ?? "";
}

export function Defaults() {
  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      example: "",
      exampleRequired: "",
    },
  });

  const formDefaults = useForm<z.infer<typeof FormSchemaDefaults>>({
    resolver: zodResolver(FormSchemaDefaults),
  });

  const formOverrides = useForm();
  const formTimeSlots = useForm({
    defaultValues: setDefaultTimeSlotValues(),
  });

  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState("");
  const [excludedDayOfWeek, setExcludedDayOfWeek] = useState("");

  const [state, dispatch] = useReducer(reducer, initialSettings);

  const { register, setValue } = useForm();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <section>
        <div className="mb-4">
          <div className="text-base">Defaults</div>
          <div>Select the default scheduled days of the the week.</div>
        </div>
        <Form {...formDefaults}>
          <form className="w-2/3 space-y-6" key={v4()}>
            <FormField
              control={formDefaults.control}
              name="daysOfWeekField"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select a day...</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        setSelectedDayOfWeek(value);
                        field.onChange(value);
                      }}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {daysOfWeek.map((day) => (
                        <FormItem
                          className="flex items-center space-x-3 space-y-0"
                          key={v4()}
                        >
                          <FormControl>
                            <RadioGroupItem value={day.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {day.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </section>

      {getDay(selectedDayOfWeek) && (
        <section>
          <div className="mb-4">
            <div className="text-base">{`${getDayOfWeekName(
              selectedDayOfWeek
            )}`}</div>
            <div>Set the start, end times and gap between each inspection.</div>
            <Form {...formOverrides} key={v4()}>
              <form className="space-y-6" key={v4()}>
                {daysOfWeek.map((day) => {
                  return day.value === selectedDayOfWeek ? (
                    <FormField
                      key={v4()}
                      control={formOverrides.control}
                      name={`overridesDayField_${day.value}`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                setExcludedDayOfWeek(
                                  `${selectedDayOfWeek}_${checked}`
                                );

                                dispatch({
                                  type: WeeklySettingsActionType.updateDay,
                                  selectedDay:
                                    getDayOfWeekName(selectedDayOfWeek),
                                  daySettings: {
                                    value: selectedDayOfWeek,
                                    isDayExcluded: checked as boolean,
                                  },
                                });

                                field.onChange(checked);
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>{`Exclude all of ${
                              getDayOfWeekName(day.value)
                            }`}</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  ) : (
                    <></>
                  );
                })}
              </form>
            </Form>
          </div>

          <div className="mb-4">
            <div>{`Set the start and end time slots for each ${getDayOfWeekName(
              selectedDayOfWeek
            )}`}</div>
            <Form {...formTimeSlots} key={v4()}>
              <form className="space-y-6" key={v4()}>
                <div className="flex flex-col items-start rounded-md border p-4 shadow">
                  {daysOfWeek.map((day) => {
                    return (
                      <div
                        className={
                          day.value === selectedDayOfWeek ? "" : "hidden"
                        }
                        key={v4()}
                      >
                        {[1, 2, 3, 4].map((n) => (
                          <div className="flex flex-row py-2" key={v4()}>
                            <FormField
                              key={v4()}
                              control={formTimeSlots.control}
                              name={`timeSlot${n}From_${day.value}`}
                              render={({ field }) => (
                                <FormItem className="px-4">
                                  <FormControl>
                                    <Input
                                      type="time"
                                      {...field}
                                      value={field.value}
                                      disabled={
                                        excludedDayOfWeek ===
                                        `${day.value}_true`
                                      }
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={formTimeSlots.control}
                              name={`timeSlot${n}To_${day.value}`}
                              render={({ field }) => (
                                <FormItem className="">
                                  <FormControl>
                                    <Input
                                      type="time"
                                      {...field}
                                      value={field.value}
                                      disabled={
                                        excludedDayOfWeek ===
                                        `${day.value}_true`
                                      }
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </form>
            </Form>
          </div>
        </section>
      )}
    </div>
  );
}