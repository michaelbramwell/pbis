"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { WeeklySettings } from "@/app/model";

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

export function Defaults() {
  const formDefaults = useForm<z.infer<typeof FormSchemaDefaults>>({
    resolver: zodResolver(FormSchemaDefaults),
  });

  const formOverrides = useForm();
  const formTimeSlots = useForm({
    defaultValues: setDefaultTimeSlotValues(),
  });

  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState("");
  const [excludedDayOfWeek, setExcludedDayOfWeek] = useState("");

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <section>
        <div className="mb-4">
          <div className="text-base">Defaults</div>
          <div>Select the default scheduled days of the the week.</div>
        </div>
        <Form {...formDefaults}>
          <form className="w-2/3 space-y-6">
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
                        return field.onChange;
                      }}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {daysOfWeek.map((day) => (
                        <FormItem
                          className="flex items-center space-x-3 space-y-0"
                          key={`default_${day.value}`}
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

      {daysOfWeek[parseInt(selectedDayOfWeek)] && (
        <section>
          <div className="mb-4">
            <div className="text-base">{`${
              daysOfWeek[parseInt(selectedDayOfWeek)]?.label ?? ""
            }`}</div>
            <div>Set the start, end times and gap between each inspection.</div>
            <Form {...formOverrides}>
              <form className="space-y-6">
                {daysOfWeek.map((day) => {
                  return day.value === selectedDayOfWeek ? (
                    <FormField
                      key={`day_${day.value}`}
                      control={formOverrides.control}
                      name={`overridesDayField_${day.value}`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                console.log(`${selectedDayOfWeek}_${checked}`);
                                setExcludedDayOfWeek(
                                  `${selectedDayOfWeek}_${checked}`,
                                );
                                return field.onChange;
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>{`Exclude all of ${
                              daysOfWeek[parseInt(day.value)].label
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
            <div>{`Set the start and end time slots for each ${
              daysOfWeek[parseInt(selectedDayOfWeek)]?.label ?? ""
            }`}</div>
            <Form {...formTimeSlots}>
              <form className="space-y-6">
                <div className="flex flex-col items-start rounded-md border p-4 shadow">
                  {daysOfWeek.map((day) => {
                    return (
                      <div
                        className={
                          day.value === selectedDayOfWeek ? "" : "hidden"
                        }
                        key={`days_timeslots_${day.value}`}
                      >
                        {[1, 2, 3, 4].map((n) => (
                          <div className="flex flex-row py-2" key={`slot_${n}`}>
                            <FormField
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
