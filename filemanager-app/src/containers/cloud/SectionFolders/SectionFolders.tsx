import { Heading } from "@/app/components/Headers/Heading/Heading";
import { FolderList } from "@/app/components/Lists/FolderList/FolderList";
import { getAllFolders } from "@/services/filemanager/get/getAllFolders/getAllFolders";

export const SectionFolders = async (): Promise<JSX.Element> => {
  const folders = await getAllFolders();
  return (
    <section className="flex flex-col items-start justify-center w-full h-auto mt-8">
      <Heading className="font-semibold text-base mb-2 lg:text-xl" element="h2">
        Folders
      </Heading>

      <FolderList folders={folders} folderType="simple"></FolderList>
    </section>
  );
};
