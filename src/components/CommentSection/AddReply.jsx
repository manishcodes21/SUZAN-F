'use client';
import { Avatar, Card, Stack, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import theme from "./styles";
import AddReplyButton from "./Reusable/Buttons/BgButtons/AddReplyButton";
import EditableReplyField from "./Reusable/Reply/EditableReplyField";
import avatar from "@/assets/Comment/avatar.png";
import { useGlobalContext } from "@/context/AuthContext";

const AddReply = ({ onAdd }) => {
  const [replyText, setReplyText] = useState("");
  const { user: currentUser } = useGlobalContext(); // Fetch current user's details

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <div className="p-[10px] md:p-[15px]">
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar
              className="max-md:!hidden"
              src={currentUser?.picture || avatar} // Use user's picture if available, otherwise fallback to default avatar
              variant="rounded"
              alt="user-avatar"
            />
            <div className="w-full">
              <EditableReplyField
                placeHolder="Add a reply"
                setText={setReplyText}
                text={replyText}
              />
              <AddReplyButton
                onAdd={onAdd}
                replyText={replyText}
                setReplyText={setReplyText}
              />
            </div>
          </Stack>
        </div>
      </Card>
    </ThemeProvider>
  );
};

export default AddReply;
