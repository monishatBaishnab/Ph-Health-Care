type TOptions = {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
};

type TOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

const calculatePaginate = (options: TOptions): TOptionsResult => {
  const page: number = Number(options?.page) || 1;
  const limit: number = Number(options?.limit) || 10;
  const skip: number = (page - 1) * limit;

  const sortBy: string = options?.sortBy || "createdAt";
  const sortOrder: string = options?.sortOrder || "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export default calculatePaginate;
