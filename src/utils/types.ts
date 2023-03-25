import * as Yup from "yup";

export const socials: { id: string; name: string; value: string }[] = [
  { id: "2", name: "LinkedIn", value: "LKIN" },
  { id: "1", name: "Twitter", value: "TWTT" },
];

export const validateUrl = Yup.object().shape({
  url: Yup.string().url("Provide valid url").required("Please provide url"),
});
