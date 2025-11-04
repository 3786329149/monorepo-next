"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/shadcn/components/ui/avatar";

export function UserAvatar() {
  return (
    <>
      {/* 用户头像 */}
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>AN</AvatarFallback>
      </Avatar>
      <span className="text-xs text-muted-foreground">Hello, Ann 👋</span>
    </>
  );
}
