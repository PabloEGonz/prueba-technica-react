import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CompanyInfo } from "@/types/types";
import { setCompanies } from "../store/companySlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useEffect } from "react";

const FormSchema = z.object({
  country: z.string().min(1, "Por favor seleccione una opción."),
});

const FormularioPais = () => {
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [queryKey, setQueryKey] = useState("");

  const { data } = useQuery<CompanyInfo[]>({
    queryKey: ["companias", queryKey],
    queryFn: () => {
      const baseUrl = "https://core-financiero-backend.onrender.com/test/test";
      const url = queryKey.trim()
        ? `${baseUrl}?country=${encodeURIComponent(queryKey)}`
        : baseUrl;
      return fetch(url).then((res) => res.json());
    },
    enabled: queryKey !== "", // Unicamente se ejecuta la query si queryKey tiene un valor
  });

  function onSubmit() {
    const selectedCountry = form.getValues("country");
    setQueryKey(selectedCountry); // Actualiza el valor de la query key
  }
  useEffect(() => {
    if (data) {
      dispatch(setCompanies(data));
    }
  }, [data, dispatch]);
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6 p-5 border mx-auto"
        >
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seleccione el país</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value=" ">Todos</SelectItem>
                    <SelectItem value="United States of America">
                      Estados Unidos de América
                    </SelectItem>
                    <SelectItem value="Spain">España</SelectItem>
                    <SelectItem value="Canada">Canadá</SelectItem>
                    <SelectItem value="Netherlands">Países Bajos</SelectItem>
                    <SelectItem value="Germany">Alemania</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Si selecciona Todos se mostraran una lista con todas las opciones disponibles</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default FormularioPais;
