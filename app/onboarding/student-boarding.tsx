import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StudentBoarding() {
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">First Name</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Last Name</Label>
            </div>
            <Input id="password" type="password" required />
          </div>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">School</Label>
          </div>
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Select your school" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">
                  Naga College Foundation, Inc.
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Program</Label>
          </div>
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Select your program" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">BS Computer Science</SelectItem>
                <SelectItem value="banana">BS Information System</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Invite Code </Label>
          </div>
          <Input id="password" type="password" required />
          <p className="text-xs font-normal text-gray-500 italic">
            ask your coordinator for invite code
          </p>
        </div>

        <Button type="submit" className="w-full">
          Continue
        </Button>
      </div>
    </form>
  );
}
