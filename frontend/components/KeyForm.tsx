"use client";
import { fetchDownloadLinks } from "@/services/dataServices";
import { Button } from "@nextui-org/button";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { Form } from "@nextui-org/form";
import { FormEvent } from "react";

type KeyFormProps = {
  keys: string[];
  url: string;
  isMultiple: boolean;
  isDifferent: boolean;
};

export default function KeyForm({ keys, url, isMultiple, isDifferent }: KeyFormProps) {
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const chosenKeys = new FormData(e.currentTarget).getAll("keys") as string[];
    console.log("Choosen keys:", chosenKeys);
    const response = await fetchDownloadLinks(url, isDifferent, isMultiple, chosenKeys);
    console.log("Response:", response);
    console.log("Form submitted");
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <CheckboxGroup name="keys">
          {keys.map((key, index) => (
            <Checkbox key={index} value={key}>
              {key}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}
