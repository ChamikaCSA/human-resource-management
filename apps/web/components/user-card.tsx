import { User } from "../app/directory/types";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaBuilding,
  FaBriefcase,
  FaMapMarkerAlt,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { getJobTitles } from "../lib/users";

const UserCardCompact = ({ user, onClick }: { user: User; onClick: () => void }) => (
  <Card className="transition-shadow duration-300 bg-white rounded-lg overflow-hidden flex flex-col relative cursor-pointer h-auto shadow-lg hover:shadow-2xl mb-10 mx-5" onClick={onClick}>
    <CardHeader className="relative z-10 bg-cover bg-center p-4">
      <div className="flex flex-col items-center justify-center">
        <h6 className="text-lg font-semibold text-gray-900">{user.firstName} {user.lastName}</h6>
        <Avatar className="my-3 border-2 border-white w-20 h-20">
          <AvatarImage src={`https://www.gravatar.com/avatar/${user.id.slice(0, 8)}?d=identicon`} alt={user.firstName} />
          <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
        </Avatar>
        <span className="text-sm text-gray-700">{user.jobTitle}</span>
      </div>
    </CardHeader>
    <CardContent className="bg-teal-500 text-white p-4">
      <p className="text-sm font-medium">{user.department}</p>
      <p className="text-xs text-gray-100">{user.employmentType}</p>
    </CardContent>
  </Card>
);

const UserCardDetailed = ({ user, onClose }: { user: User; onClose: () => void }) => (
  <Card className="transition-shadow duration-300 bg-white rounded-lg overflow-hidden flex flex-col shadow-lg hover:shadow-2xl">
    <CardHeader className="relative z-10 bg-cover bg-center p-4 bg-teal-500 text-white">
      <div className="flex items-center">
        <Avatar className="mr-3 border-2 border-white w-32 h-32">
          <AvatarImage src={`https://www.gravatar.com/avatar/${user.id.slice(0, 8)}?d=identicon`} alt={user.firstName} />
          <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h6 className="text-xl font-semibold">{user.firstName} {user.lastName}</h6>
          <span className="text-base text-gray-100">{user.jobTitle}</span>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4 p-4 pb-[28px]">
      <div className="flex items-center text-gray-900">
        <FaEnvelope className="mr-2 text-teal-700" />
        <div>
          <span className="block text-sm font-medium text-gray-700">Email</span>
          <span className="text-base font-semibold">{user.email}</span>
        </div>
      </div>
      <div className="flex items-center text-gray-900">
        <FaBirthdayCake className="mr-2 text-teal-700" />
        <div>
          <span className="block text-sm font-medium text-gray-700">Birth Date</span>
          <span className="text-base font-semibold">{new Date(user.birthDate).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="flex items-center text-gray-900">
        <FaPhone className="mr-2 text-teal-700" />
        <div>
          <span className="block text-sm font-medium text-gray-700">Phone</span>
          <span className="text-base font-semibold">{user.phoneNumber}</span>
        </div>
      </div>
      <div className="flex items-center text-gray-900">
        <FaBuilding className="mr-2 text-teal-700" />
        <div>
          <span className="block text-sm font-medium text-gray-700">Department</span>
          <span className="text-base font-semibold">{user.department}</span>
        </div>
      </div>
      <div className="flex items-center text-gray-900">
        <FaBriefcase className="mr-2 text-teal-700" />
        <div>
          <span className="block text-sm font-medium text-gray-700">Employment Type</span>
          <span className="text-base font-semibold">{user.employmentType}</span>
        </div>
      </div>
      <div className="flex items-center text-gray-900">
        <FaMapMarkerAlt className="mr-2 text-teal-700" />
        <div>
          <span className="block text-sm font-medium text-gray-700">Work Location</span>
          <span className="text-base font-semibold">{user.workLocation}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const UserCard = ({ user, isSelected, onClick, onClose }: { user: User; isSelected: boolean; onClick: () => void; onClose: () => void }) => {
  return isSelected ? (
    <UserCardDetailed user={user} onClose={onClose} />
  ) : (
    <UserCardCompact user={user} onClick={onClick} />
  );
};

export default UserCard;

export { UserCardCompact, UserCardDetailed };

export const UserCardSkeleton = () => (
  <Card className="bg-gray-200 rounded-lg overflow-hidden flex flex-col animate-pulse h-auto shadow-md mb-10 mx-5">
    <div className="p-4 flex flex-col items-center justify-center">
      <Skeleton className="h-6 bg-gray-300 mb-3 w-1/2" />
      <Skeleton className="rounded-full h-20 w-20 bg-gray-300 mb-3" />
      <Skeleton className="h-4 bg-gray-300 mb-2 w-1/3" />
    </div>
    <div className="bg-teal-500 text-white p-4">
      <Skeleton className="h-4 bg-gray-300 mb-2 w-1/2" />
      <Skeleton className="h-3 bg-gray-300 w-1/3" />
    </div>
  </Card>
);

export const UserSearchAndFilter = ({ onSearch, onFilter }: { onSearch: (query: string) => void; onFilter: (jobTitle: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [jobTitles, setJobTitles] = useState<string[]>([]);

  useEffect(() => {
    const fetchJobTitles = async () => {
      const titles = await getJobTitles();
      setJobTitles(titles);
    };
    fetchJobTitles();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterChange = (value: string) => {
    setSelectedJobTitle(value === "all" ? "" : value);
    onFilter(value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="flex justify-between items-center mb-6 space-x-4">
      <div className="relative w-full max-w-xs flex-grow">
        <Input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border p-2 rounded shadow-sm pl-10 focus:ring-2 focus:ring-teal-500 w-full"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {searchQuery && (
          <FaTimes className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" onClick={clearSearch} />
        )}
      </div>
      <div className="w-full max-w-xs flex-grow">
        <Select value={selectedJobTitle} onValueChange={handleFilterChange}>
          <SelectTrigger className="border p-2 rounded shadow-sm focus:ring-2 focus:ring-teal-500 w-full">
            <span>{selectedJobTitle || "Select Job Title"}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Job Titles</SelectItem>
            {jobTitles.map((title) => (
              <SelectItem key={title} value={title}>{title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
