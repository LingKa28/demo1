"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Drawer,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { InlineEdit } from "@/components/inline-edit";
import {
  Bookmark,
  BookmarkBorder,
  CloseRounded,
  Star,
} from "@mui/icons-material";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

export interface SnackbarMessage {
  message: string;
  key: number;
}

type RowData = {
  key: string;
  title: string;
  description: string;
  content: string;
  created: Date;
  bookmarked: boolean;
};

export default function Home() {
  const [tabValue, setTabValue] = useState<number>(0);
  const [tableData, setTableData] = useState<RowData[]>([]);

  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
  const [snackOpen, setSnackOpen] = useState<boolean>(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined
  );

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<string>("");

  useEffect(() => {
    const tableData: RowData[] = Array.from({ length: 10 }, () => ({
      key: faker.string.uuid(),
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
      created: faker.date.past(),
      bookmarked: faker.datatype.boolean(),
    }));

    setTableData(tableData);
  }, [tabValue]);

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setSnackOpen(true);
    } else if (snackPack.length && messageInfo && snackOpen) {
      setSnackOpen(false);
    }
  }, [snackPack, messageInfo, snackOpen]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const handleToggleBookmark = (row: RowData) => {
    const updatedData = tableData.map((item) => {
      if (item.key === row.key) {
        return { ...item, bookmarked: !item.bookmarked };
      }
      return item;
    });
    setTableData(updatedData);

    const message = row.bookmarked ? "Bookmark removed" : "Bookmark added";
    enqueueSnackbar(message, { variant: "success" });
  };

  const handleButtonClick = (content: string) => {
    setDrawerContent(content);
    setDrawerOpen(true);
  };

  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Card className="shadow-none mb-4 p-4">
        <Typography variant="h6" className="mb-4">
          Search
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField label="Input One" size="small" variant="outlined" />
          <TextField label="Input Two" size="small" variant="outlined" />
          <TextField label="Input Three" size="small" variant="outlined" />
          <TextField label="Input Four" size="small" variant="outlined" />
        </Stack>
      </Card>

      <Box className="bg-white p-4 rounded-lg overflow-x-auto">
        <Box className="mb-4 border-b border-gray-300">
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Item One" icon={<Star />} />
            <Tab label="Item Two" icon={<Star />} />
            <Tab label="Item Three" icon={<Star />} />
          </Tabs>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold">Title</TableCell>
              <TableCell className="font-bold">Description</TableCell>
              <TableCell className="font-bold" align="center">
                Created
              </TableCell>
              <TableCell className="font-bold" align="center">
                Bookmarked
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow
                key={row.key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" width={200}>
                  <InlineEdit
                    value={row.title}
                    onChange={(newValue) => {
                      const updatedData = tableData.map((item) => {
                        if (item.title === row.title) {
                          return { ...item, title: newValue };
                        }
                        return item;
                      });
                      setTableData(updatedData);
                    }}
                  />
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell align="center">
                  {dayjs(row.created).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => {
                      handleToggleBookmark(row);
                    }}
                  >
                    {row.bookmarked ? <Bookmark /> : <BookmarkBorder />}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleButtonClick(row.content)}>
                    Preview
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 500, background: "#F7F5F2" }} className="p-16 h-full">
          <Typography textAlign={"center"} variant="h5" className="mb-8">
            Preview
          </Typography>
          <Box className="bg-white p-8">{drawerContent}</Box>
        </Box>
      </Drawer>

      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        message={messageInfo ? messageInfo.message : undefined}
        action={
          <Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <CloseRounded />
            </IconButton>
          </Fragment>
        }
      />
    </SnackbarProvider>
  );
}
