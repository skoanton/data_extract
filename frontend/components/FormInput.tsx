"use client";
import { Input } from "@nextui-org/input";
import { Form } from "@nextui-org/form";
import { Button } from "@nextui-org/button";
import { FormEvent, useState } from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { fetchDownloadLinks, getKeys } from "@/services/dataServices";
import KeyForm from "./KeyForm";
type inputProps = {};

export default function FormInput({}: inputProps) {
  const [link, setLink] = useState("");
  const [settings, setSettings] = useState({
    multipleJSON: false,
    includeKeys: false,
    different: false,
  });
  const [error, setError] = useState("This field is required");
  const [isInvalidLinkInput, setIsInvalidLinkInput] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [keys, setKeys] = useState([]);
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
    setSettings(settings);
    if (!settings.multipleJSON) {
      if (downloadLink.endsWith(".json")) {
        console.log("Single json selected");
      } else {
        setIsInvalidLinkInput(true);
        setError("This field should be a json file");
        setIsInvalidLinkInput(false);
        return;
      }
    }

    if (settings.includeKeys) {
      setIsInvalidLinkInput(false);
      const keys = await getKeys(downloadLink, settings.different, settings.multipleJSON);
      if (keys) {
        setKeys(keys);
      } else {
        console.log("Error");
      }
    }

    setLink(downloadLink);
    setSubmitted(true);
    console.log("Form submitted");
  };

  return (
    <>
      <Form onSubmit={onSubmit} validationBehavior="native" className="mb-4">
        <Input
          isInvalid={isInvalidLinkInput}
          isRequired
          errorMessage={error}
          placeholder="Enter a link"
          label="Link"
          name="downloadLink"
          type="text"
        />
        <CheckboxGroup name="settings" label="Select options">
          <Checkbox value="multipleJSON">Multiple json</Checkbox>
          <Checkbox value="includeKeys">Get json keys</Checkbox>
          <Checkbox value="different">Different json</Checkbox>
        </CheckboxGroup>
        <Button type="submit">Submit</Button>
      </Form>

      {submitted && keys.length > 0 && <KeyForm keys={keys} url={link} isMultiple={settings.multipleJSON} isDifferent={settings.different} />}
    </>
  );
}
