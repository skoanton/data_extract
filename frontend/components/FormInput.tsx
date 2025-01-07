"use client";
import { Input } from "@nextui-org/input";
import { Form } from "@nextui-org/form";
import { Button } from "@nextui-org/button";
import { FormEvent, useState } from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { fetchDownloadLinks, getKeys } from "@/services/dataServices";
type inputProps = {};

export default function FormInput({}: inputProps) {
  const [link, setLink] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const downloadLink = formData.get("downloadLink") as string;
    const newSettings = formData.getAll("settings");
    const settings = {
      multipleJSON: newSettings.includes("multipleJSON"),
      includeKeys: newSettings.includes("includeKeys"),
      different: newSettings.includes("different"),
    };

    if (settings.includeKeys) {
      console.log("Include keys selected");
      const response = await getKeys(downloadLink, settings.different);
      console.log("Response", response);
    }

    if (settings.multipleJSON) {
      console.log("Multiple json selected");
      const response = await fetchDownloadLinks(downloadLink);
      console.log("Response", response);

      if (settings.includeKeys) {
        console.log("Include keys selected");
      }

      if (settings.different) {
        console.log("Different json selected");
      }
    } else {
      console.log("Single json selected");
    }

    setLink(downloadLink);

    setSubmitted(true);
    console.log("Form submitted");
  };

  return (
    <>
      <Form onSubmit={onSubmit} validationBehavior="native">
        <Input isRequired errorMessage="This field is required" placeholder="Enter a link" label="Link" name="downloadLink" type="text" />
        <CheckboxGroup name="settings" label="Select options">
          <Checkbox value="multipleJSON">Multiple json</Checkbox>
          <Checkbox value="includeKeys">Get json keys</Checkbox>
          <Checkbox value="different">Different json</Checkbox>
        </CheckboxGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}
