"use client";
import { fetchDownloadLinks } from "@/services/dataServices";
import { Button } from "@nextui-org/button";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { Form } from "@nextui-org/form";
import { Input } from "@nextui-org/input";
import { input } from "@nextui-org/theme";
import { FormEvent, useState } from "react";

type KeyFormProps = {
  keys: string[];
  url: string;
  isMultiple: boolean;
  isDifferent: boolean;
};

export default function KeyForm({ keys, url, isMultiple, isDifferent }: KeyFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});

  const handleValueChange = (key: string, val: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: val,
    }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const chosenKeys = formData.getAll("keys") as string[];
    const inputs: string[] = [];
    chosenKeys.forEach((key) => {
      const value = formData.get(`keyValue-${key}`) as string;
      inputs.push({ key, value });
    });
    console.log("Inputs:", inputs, chosenKeys);

    const response = await fetchDownloadLinks(url, isDifferent, isMultiple, chosenKeys);
    console.log("Response:", response);
    console.log("Form submitted");
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <CheckboxGroup name="keys">
          {keys.map((key, index) => (
            <div key={index}>
              <Checkbox value={key}>{key}</Checkbox>
              <Input name={`keyValue-${key}`} value={values[key] || ""} onValueChange={(val) => handleValueChange(key, val)} />
            </div>
          ))}
        </CheckboxGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}
