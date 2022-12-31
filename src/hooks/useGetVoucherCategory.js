import { useState } from "react";
import { useQuery } from "react-query";
import { getAllVouchersCategory } from "../api/categoryAPI";

export const useGetVoucherCategory = (category) => {
  const [categories, setCategories] = useState([]);

  useQuery(
    [category],
    () => getAllVouchersCategory(category),

    {
      enabled: !!category,
      onSuccess: (categories) => {
        const options = categories.map(({ _id, voucherType, price }) => {
          return {
            id: _id,
            voucherType,
            price,
          };
        });

        setCategories(options);
      },
    }
  );

  return { categories };
};
