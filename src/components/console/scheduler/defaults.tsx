"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState, useReducer, use, useEffect } from "react";
import {
  WeeklySettings,
  WeeklySettingsAction,
  SettingsActionType,
  OverrideSettings,
  OverrideSettingsAction,
  AvailableTimeSlot,
} from "@/app/model";
import { v4 } from "uuid";

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

const initialWeeklySettings: StripeIssuingCardNumberDisplayElementOptionsuu = {
  sunday: null,
  monday: null,
  tuesday: null,
  wednesday: null,
  thursday: null,
  friday: null,
  saturday: null,
};

const initialOverrideSettings: OverrideSettings = {
  settings: [],
};

function weeklySettingsReducer(
  settings: WeeklySettings,
  action: WeeklySettingsAction
) {
  switch (action.type) {
    case SettingsActionType.updateDay: {
      return {
        ...settings,
        [action.selectedDay.toLowerCase()]: {
          ...[action.selectedDay.toLowerCase()],
          value: action.daySettings?.value ?? "",
          isDayExcluded: action.daySettings?.isDayExcluded ?? false,
        },
      };
    }
    case SettingsActionType.updateTimeSlot: {
      const filteredAvailabilityState = (
        settings[action.selectedDay.toLowerCase()]?.availability ?? []
      ).filter(
        (element: AvailableTimeSlot) => element.index !== action.timeSlot?.index
      );

      return {
        ...settings,
        [action.selectedDay.toLowerCase()]: {
          ...[action.selectedDay.toLowerCase()],
          value: action.daySettings?.value ?? "",
          isDayExcluded: action.daySettings?.isDayExcluded ?? false,
          availability: [...filteredAvailabilityState, action.timeSlot],
        },
      };
    }
  }

  throw Error("Unknown action: " + action.type);
}

function overrideSettingsReducer(
  overrideSettings: OverrideSettings,
  action: OverrideSettingsAction
) {
  switch (action.type) {
    case SettingsActionType.overrideDate: {
      return {
        ...overrideSettings,
        settings: [...overrideSettings.settings, action],
      };
    }
  }

  throw Error("Unknown action: " + action.type);
}

function getDay(dayOfWeek: string = "0") {
  return daysOfWeek[parseInt(dayOfWeek)];
}

function getDayOfWeekName(dayOfWeek: string = "0") {
  return daysOfWeek[parseInt(dayOfWeek)]?.label ?? "";
}

export function Defaults() {
  const {
    formState: { errors },
  } = useForm();

  const formDefaults = useForm<z.infer<typeof FormSchemaDefaults>>({
    resolver: zodResolver(FormSchemaDefaults),
  });

  const formOverrides = useForm();
  const formTimeSlots = useForm();

  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState("");
  const [excludedDayOfWeek, setExcludedDayOfWeek] = useState("");
  const [weeklySettingsState, weeklySettingsDispatch] = useReducer(
    weeklySettingsReducer,
    initialWeeklySettings
  );
  const [overrideSettingsState, overrideSettingsDispatch] = useReducer(
    overrideSettingsReducer,
    initialOverrideSettings
  );

  const [selectedDay, setSelectedDay] = useState<Date>();

  useEffect(() => {
    console.log(weeklySettingsState);
  }, [weeklySettingsState]);

  useEffect(() => {
    console.log(overrideSettingsState);
  }, [overrideSettingsState]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <section>
          <div className="mb-4">
            <div className="text-base font-semibold">Defaults</div>
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
            <div className="mt-5 mb-4">
              <div className="text-base font-medium">{`${getDayOfWeekName(
                selectedDayOfWeek
              )}`}</div>
              <div>
                Set the start, end times and gap between each inspection.
              </div>
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

                                  weeklySettingsDispatch({
                                    type: SettingsActionType.updateDay,
                                    selectedDay:
                                      getDayOfWeekName(selectedDayOfWeek),
                                    daySettings: {
                                      value: selectedDayOfWeek,
                                      isDayExcluded: checked as boolean,
                                      availability: null,
                                    },
                                    timeSlot: null,
                                  });

                                  field.onChange(checked);
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>{`Exclude all of ${getDayOfWeekName(
                                day.value
                              )}`}</FormLabel>
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

            {timeslots(true, getDayOfWeekName(selectedDayOfWeek))}
          </section>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-10">
        <section>
          <div className="mb-4">
            <div className="text-base font-semibold">Overrides</div>
            <div>
              Override defaults by selecting a day and setting the appointment
              times.
            </div>
          </div>
          <Calendar
            mode="single"
            showOutsideDays={true}
            selected={selectedDay}
            onSelect={(day) => {
              if (!day) return;

              if (
                overrideSettingsState.settings.some(
                  (s) => s.date?.getTime() === day.getTime()
                )
              ) {
                return;
              }

              console.log(day);
              overrideSettingsDispatch({
                type: "overrideDay",
                ticks: day?.getTime() ?? null,
                date: day ?? null,
                availability: null,
              });

              setSelectedDay(day);
            }}
          ></Calendar>
        </section>
        {/* <section>
          {selectedDay &&
            timeslots(false, selectedDay ? format(selectedDay, "PPP") : "")}
        </section> */}
      </div>
    </>
  );

  function timeslots(isDefaultMode = true, dayStrVal: string) {
    return (
      <div className="mt-4 mb-4">
        <div>{`Set the start and end time slots for each ${dayStrVal}`}</div>
        <Form {...formTimeSlots} key={v4()}>
          <form className="space-y-6" key={v4()}>
            <div className="flex flex-col items-start rounded-md border p-4 shadow">
              {daysOfWeek.map((day) => {
                return (
                  <div
                    className={day.value === selectedDayOfWeek ? "" : "hidden"}
                    key={v4()}
                  >
                    {[1, 2, 3, 4].map((n, index) => (
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
                                    isDefaultMode &&
                                    weeklySettingsState[
                                      getDayOfWeekName(
                                        selectedDayOfWeek
                                      ).toLocaleLowerCase() as keyof typeof weeklySettingsState
                                    ]?.isDayExcluded
                                  }
                                  onChange={(e) => {
                                    field.onChange(e.target.value);

                                    weeklySettingsDispatch({
                                      type: SettingsActionType.updateTimeSlot,
                                      selectedDay:
                                        getDayOfWeekName(selectedDayOfWeek),
                                      daySettings: {
                                        value: selectedDayOfWeek,
                                        isDayExcluded: false,
                                        availability: null,
                                      },
                                      timeSlot: {
                                        from: e.target.value,
                                        to:
                                          weeklySettingsState[
                                            getDayOfWeekName(
                                              selectedDayOfWeek
                                            ).toLocaleLowerCase() as keyof typeof weeklySettingsState
                                          ]?.availability?.[index]?.to ?? "",
                                        index: index,
                                      },
                                    });
                                  }}
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
                                    isDefaultMode &&
                                    weeklySettingsState[
                                      getDayOfWeekName(
                                        selectedDayOfWeek
                                      ).toLocaleLowerCase() as keyof typeof weeklySettingsState
                                    ]?.isDayExcluded
                                  }
                                  onChange={(e) => {
                                    field.onChange(e.target.value);

                                    weeklySettingsDispatch({
                                      type: SettingsActionType.updateTimeSlot,
                                      selectedDay:
                                        getDayOfWeekName(selectedDayOfWeek),
                                      daySettings: {
                                        value: selectedDayOfWeek,
                                        isDayExcluded: false,
                                        availability: null,
                                      },
                                      timeSlot: {
                                        from:
                                          weeklySettingsState[
                                            getDayOfWeekName(
                                              selectedDayOfWeek
                                            ).toLocaleLowerCase() as keyof typeof weeklySettingsState
                                          ]?.availability?.[index]?.from ?? "",
                                        to: e.target.value,
                                        index: index,
                                      },
                                    });
                                  }}
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
    );
  }
}
