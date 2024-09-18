import NavBar from '@/components/NavBar';
import TableComponent from '@/components/Table/TableComponent';
import AddEventSection from '@/components/AddEventSection';

export function Index() {
  return (
    <div className="wrapper">
      <div className="container">
        <NavBar />
        <div className="flex flex-col items-center justify-between">
          <div className="flex w-full">
            <AddEventSection />
            </div>
          <div className="divider"></div>
          <div className="w-full">
            <TableComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
