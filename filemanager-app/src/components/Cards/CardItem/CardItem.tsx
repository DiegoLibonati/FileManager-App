"use client";

import { CardItemProps } from "../../../../next-env";
import { Card } from "../Card/Card";
import { Heading } from "@/components/Headers/Heading/Heading";
import { Paragraph } from "@/components/Paragraph/Paragraph";
import { CardIcon } from "../CardIcon/CardIcon";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { ButtonActions } from "@/components/Buttons/ButtonActions/ButtonActions";
import { DropdownActions } from "@/components/Dropdown/DropdownActions/DropdownActions";
import { useRouter } from "next/navigation";
import { parseEscapeString } from "@/helpers/utils";
import { deleteItem } from "@/services/filemanager/delete/deleteItem/deleteItem";
import { useAlertStore } from "@/hooks/useAlertStore";

export const CardItem = ({
  idCategory,
  bgColor,
  color,
  title,
  subTitle,
  path,
  type,
  className,
}: CardItemProps): JSX.Element => {
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);

  const refButtonActions = useRef<HTMLButtonElement | null>(null);

  const { handleSetAlert } = useAlertStore();
  const router = useRouter();

  const handleClickButtonActions: MouseEventHandler<HTMLButtonElement> = (
    e
  ): void => {
    e.stopPropagation();
    setActiveDropdown(!activeDropdown);
    return;
  };

  const handleClickDeleteElement: MouseEventHandler<
    HTMLHeadingElement
  > = async (e): Promise<void> => {
    e.stopPropagation();
    handleSetAlert("loading", "Deleting...", true);
    await deleteItem(parseEscapeString(path), type);
    setActiveDropdown(false);
    router.refresh();
    handleSetAlert("info", `Successfully deleted: ${title}`, true);
  };

  const handleClickCard = (): void => {
    if (type === "folder") {
      router.push(`/folder/${path}`);
    }
  };

  return (
    <Card
      className={`relative flex flex-row items-center justify-start shadow-md w-full h-24 p-4 bg-white rounded-lg lg:h-32 ${
        type === "folder" ? "cursor-pointer" : ""
      } ${className}`}
      onClick={handleClickCard}
    >
      <CardIcon
        bgColor={bgColor}
        color={color}
        idCategory={idCategory}
        className="h-full [&&]:w-24"
      ></CardIcon>
      <div className="flex flex-col items-start justify-center ml-4">
        <Heading className="font-semibold text-sm text-black" element="h2">
          {title}
        </Heading>
        <Paragraph className="font-normal text-xs text-lightGray">
          {subTitle}
        </Paragraph>
      </div>
      <ButtonActions
        onClick={handleClickButtonActions}
        innerRef={refButtonActions}
      ></ButtonActions>

      {activeDropdown ? (
        <DropdownActions
          offsetLeft={refButtonActions.current?.offsetLeft!}
          onClickDelete={handleClickDeleteElement}
        ></DropdownActions>
      ) : null}
    </Card>
  );
};
