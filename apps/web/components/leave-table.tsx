import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const LeaveTable = ({ headers, rows, loading }: { headers: string[], rows: any[], loading: boolean }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg hover:shadow-2xl transition-shadow duration-300">
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader className="bg-teal-50">
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="px-2 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <TableRow>
              <TableCell colSpan={headers.length} className="text-center py-4">Loading...</TableCell>
            </TableRow>
          ) : (
            rows.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="hover:bg-teal-50 transition-colors duration-200">
                {row.map((cell: string | JSX.Element, cellIndex: number) => (
                  <TableCell key={cellIndex} className="px-2 py-4 whitespace-nowrap">{cell}</TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaveTable;