import { h } from "preact";
import { route } from "preact-router";
import { useEffect, useMemo, useState } from "preact/hooks";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import MainLayout from "../../../layouts/MainLayout";
import UserTable from "./components/UserTable";
import PageHeader from "../../../components/PageHeader";

export default function Users({ isAuthenticated, onLogout }) {
  useEffect(() => {
      if (!isAuthenticated) route("/login", true);
    }, [isAuthenticated]);

  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "Editor" },
    { id: 3, name: "Charlie", email: "charlie@example.com", role: "User" },
  ]);

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "role", header: "Role" },
    ],
    []
  );

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data: users,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <MainLayout onLogout={onLogout}>
      <PageHeader
        icon="Users"
        title="Manajemen User"
        actions={[
          { label: "Kembali", icon: "ArrowLeft", variant: "secondary", onClick: () => window.history.back() },
          { label: "Tambah User", icon: "Plus", variant: "primary", onClick: () => {} },
        ]}
      />
      <UserTable />
    </MainLayout>
  );
}