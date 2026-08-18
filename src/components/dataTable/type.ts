export type TTableheaders = {
  textAlign: "left" | "center" | "right";
  accessor: string;
  name: string | (() => string);
  render?: (param: any) => any;
  width: '10%' | '12%' | '15%' | '20%' | '25%' | '30%' | 'auto' ;
};

export type TDatatableProps = {
  headers: TTableheaders[];
  records?: any[];
  deleteUrl?: string;
  title: string;
  loading?: boolean;
  maxH?: string;
  page?: any;
  total?: number;
  totalPages?: any;
  hasNext?: boolean;
  hasPrev?: boolean;
  changePage?: (param:number)=> any
};