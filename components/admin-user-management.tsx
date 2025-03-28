"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Edit, MoreHorizontal, Search, Trash, UserPlus, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { sampleUsers } from "@/lib/auth"
import { useLeaveStore } from "@/lib/store"
import * as XLSX from "xlsx"
import { format } from "date-fns"

export function AdminUserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddUserDialog, setShowAddUserDialog] = useState(false)
  const [showEditUserDialog, setShowEditUserDialog] = useState(false)
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false)
  const [users, setUsers] = useState([...sampleUsers])
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "12345",
    role: "student",
    department: "",
    semester: 2,
    attendance: 75,
    leavesTaken: 0,
    maxLeaves: 3,
    phone: "",
  })

  const { toast } = useToast()
  const { leaveApplications } = useLeaveStore()

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.department && user.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500">Admin</Badge>
      case "teacher":
        return <Badge className="bg-blue-500">Teacher</Badge>
      default:
        return <Badge variant="outline">Student</Badge>
    }
  }

  const getStatusBadge = (attendance: number | undefined) => {
    if (!attendance) return null
    if (attendance >= 85) return <Badge className="bg-green-500">{attendance}%</Badge>
    if (attendance >= 75) return <Badge className="bg-yellow-500">{attendance}%</Badge>
    if (attendance >= 70) return <Badge className="bg-orange-500">{attendance}%</Badge>
    return <Badge variant="destructive">{attendance}%</Badge>
  }

  const handleAddUser = () => {
    // Validate form
    if (!newUser.id || !newUser.name || !newUser.email || !newUser.department) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Add new user
    const userToAdd = {
      ...newUser,
      fatherName: "",
      motherName: "",
      dateOfBirth: format(new Date(), "dd/MM/yyyy"),
      address: "Tanakpur",
      institute: "DR. A.P.J ABDUL KALAM INSTITUTE OF TECHNOLOGY, TANAKPUR",
    }

    setUsers([...users, userToAdd])
    setShowAddUserDialog(false)
    setNewUser({
      id: "",
      name: "",
      email: "",
      password: "12345",
      role: "student",
      department: "",
      semester: 2,
      attendance: 75,
      leavesTaken: 0,
      maxLeaves: 3,
      phone: "",
    })

    toast({
      title: "User Added",
      description: "The user has been added successfully",
      variant: "default",
    })
  }

  const handleEditUser = () => {
    if (!selectedUser) return

    // Update user
    const updatedUsers = users.map((user) => (user.id === selectedUser.id ? selectedUser : user))

    setUsers(updatedUsers)
    setShowEditUserDialog(false)

    toast({
      title: "User Updated",
      description: "The user has been updated successfully",
      variant: "default",
    })
  }

  const handleDeleteUser = () => {
    if (!selectedUser) return

    // Delete user
    const updatedUsers = users.filter((user) => user.id !== selectedUser.id)
    setUsers(updatedUsers)
    setShowDeleteConfirmDialog(false)

    toast({
      title: "User Deleted",
      description: "The user has been deleted successfully",
      variant: "default",
    })
  }

  const exportToExcel = () => {
    // Prepare data for export
    const data = users
      .filter((user) => user.role === "student")
      .map((user) => ({
        "Student ID": user.id,
        Name: user.name,
        Email: user.email,
        Department: user.department || "N/A",
        Semester: user.semester || "N/A",
        Attendance: user.attendance ? `${user.attendance}%` : "N/A",
        Phone: user.phone || "N/A",
        "Father's Name": user.fatherName || "N/A",
        "Mother's Name": user.motherName || "N/A",
        "Date of Birth": user.dateOfBirth || "N/A",
        Institute: user.institute || "N/A",
      }))

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(data)

    // Create workbook
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students")

    // Generate Excel file
    const fileName = `Students_${format(new Date(), "yyyy-MM-dd")}.xlsx`
    XLSX.writeFile(workbook, fileName)

    toast({
      title: "Export Successful",
      description: `Students data has been exported to ${fileName}`,
      variant: "default",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1" onClick={exportToExcel}>
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <UserPlus className="h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Create a new user account in the system</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="id">User ID / Roll Number</Label>
                  <Input
                    id="id"
                    placeholder="241620101099"
                    value={newUser.id}
                    onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="9876543210"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                {newUser.role === "student" && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        placeholder="Computer Science & Engineering"
                        value={newUser.department}
                        onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="semester">Semester</Label>
                      <Input
                        id="semester"
                        type="number"
                        placeholder="2"
                        value={newUser.semester}
                        onChange={(e) => setNewUser({ ...newUser, semester: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="attendance">Attendance (%)</Label>
                      <Input
                        id="attendance"
                        type="number"
                        placeholder="75"
                        value={newUser.attendance}
                        onChange={(e) => setNewUser({ ...newUser, attendance: Number.parseFloat(e.target.value) })}
                      />
                    </div>
                  </>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="password">Default Password</Label>
                  <Input id="password" type="text" value={newUser.password} disabled />
                  <p className="text-xs text-muted-foreground">Default password is set to "12345"</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser}>Create User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>ID / Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>
                    <div>{user.id}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{user.department || "-"}</TableCell>
                  <TableCell>{getStatusBadge(user.attendance)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => {
                            setSelectedUser(user)
                            setShowEditUserDialog(true)
                          }}
                        >
                          <Edit className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2 text-destructive"
                          onClick={() => {
                            setSelectedUser(user)
                            setShowDeleteConfirmDialog(true)
                          }}
                        >
                          <Trash className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <p className="text-muted-foreground">No users found</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={showEditUserDialog} onOpenChange={setShowEditUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-id">User ID / Roll Number</Label>
                <Input id="edit-id" value={selectedUser.id} disabled />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={selectedUser.phone || ""}
                  onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                />
              </div>
              {selectedUser.role === "student" && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-department">Department</Label>
                    <Input
                      id="edit-department"
                      value={selectedUser.department || ""}
                      onChange={(e) => setSelectedUser({ ...selectedUser, department: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-semester">Semester</Label>
                    <Input
                      id="edit-semester"
                      type="number"
                      value={selectedUser.semester || 1}
                      onChange={(e) => setSelectedUser({ ...selectedUser, semester: Number.parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-attendance">Attendance (%)</Label>
                    <Input
                      id="edit-attendance"
                      type="number"
                      value={selectedUser.attendance || 75}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, attendance: Number.parseFloat(e.target.value) })
                      }
                    />
                  </div>
                </>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditUserDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirmDialog} onOpenChange={setShowDeleteConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <p>
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>ID:</strong> {selectedUser.id}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirmDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

