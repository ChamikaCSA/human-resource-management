"use client";

import { useEffect, useState } from "react";
import { getUsers } from "../../lib/users";
import { User } from "./types";
import UserCard, { UserCardCompact, UserCardDetailed, UserCardSkeleton, UserSearchAndFilter } from "../../components/user-card";
import { PaginationWrapper } from "../../components/pagination-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const DirectoryPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterJobTitle, setFilterJobTitle] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    const fetchedUsers = await getUsers(page, limit, searchQuery, filterJobTitle);
    setUsers(fetchedUsers.users);
    setTotalUsers(fetchedUsers.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
    setSelectedUser(null); 
  }, [page, searchQuery, filterJobTitle]);

  const handleCardClick = (user: User) => {
    if (selectedUser?.id === user.id) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (jobTitle: string) => {
    setFilterJobTitle(jobTitle === "all" ? "" : jobTitle);
  };

  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(user => 
    filterJobTitle ? user.jobTitle === filterJobTitle : true
  );

  return (
    <div className="container mx-auto px-10 py-6 max-w-screen-lg">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-2xl font-bold text-teal-700">Directory</h4>
        <Button
          onClick={() => window.location.href = "/buzz"}
          variant="default"
          color="primary"
          className="bg-teal-500 hover:bg-teal-600 text-white"
        >
          Go to Buzz
        </Button>
      </div>
      <Card className="mb-10 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden">
        <CardHeader className="bg-teal-500 text-white p-4">
          <h6 className="text-lg font-semibold">Search and Filter</h6>
        </CardHeader>
        <CardContent className="p-4">
          <UserSearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />
        </CardContent>
      </Card>
      <div className="flex">
        <ScrollArea className="flex-grow overflow-y-auto h-[calc(100vh-200px)]">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${selectedUser ? '2' : '3'}`}>
            {loading ? (
              Array.from({ length: limit }).map((_, index) => (
                <UserCardSkeleton key={index} />
              ))
            ) : (
              filteredUsers.map((user) => (
                <UserCardCompact key={user.id} user={user} onClick={() => handleCardClick(user)} />
              ))
            )}
          </div>
        </ScrollArea>
        {selectedUser && (
          <div className="ml-2 w-1/3 hidden lg:block">
            <UserCard user={selectedUser} isSelected={true} onClick={() => handleCardClick(selectedUser)} onClose={() => setSelectedUser(null)} />
          </div>
        )}
      </div>
      <PaginationWrapper
        page={page}
        setPage={setPage}
        totalItems={totalUsers}
        limit={limit}
      />
      <footer className="mt-10 text-center text-teal-500">
        &copy; {new Date().getFullYear()} TealHRM. All rights reserved.
      </footer>
    </div>
  );
};

export default DirectoryPage;
