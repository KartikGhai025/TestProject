import { ENDPOINT, PROJECTID ,MAIN_BUCKET_ID} from "@/lib/appwrite";

export function idToLink(id: string): string {
  return `${ENDPOINT}/storage/buckets/${MAIN_BUCKET_ID}/files/${id}/view?project=${PROJECTID}`;
}
