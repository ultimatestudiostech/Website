import { getSite } from "@/lib/cms/store";

export async function getStudioContact() {
  const site = await getSite();
  return site.contact;
}

export async function getStudioSocials() {
  const site = await getSite();
  return site.socials;
}
