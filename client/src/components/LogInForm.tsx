import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),

  password: z.string(),
});

export function LogInForm() {
  const navigate = useNavigate();
  const { setUser, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        credentials: "include", // Send the cookies with the request
        headers: {
          "Content-Type": "application/json", // Tell the server the data is JSON
        },
        body: JSON.stringify(values), // Send the username and password as JSON
      });

      const data = await res.json();

      // Login success
      if (res.ok) {
        setUser(data.user);
        navigate("/dashboard");
      } else {
        // Login failed
        throw new Error("Login failed");
      }
    } catch (err) {
      console.error("Error during login: ", err);
    }
  }

  return (
    <>
      <div className="flex flex-col w-2/5 gap-6">
        <Card className="p-10">
          <CardHeader>
            <CardTitle className="text-sm md:text-base lg:text-2xl">
              Login
            </CardTitle>
            <CardDescription>Enter your details to login</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="joshua@email.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your email address.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="*********"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This is your password
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button className="w-full" type="submit">
                    Submit
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a
                    href="#"
                    onClick={() => navigate("/signup")}
                    className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
