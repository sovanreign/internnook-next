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

export default function CoordinatorBoarding() {
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
            <Label htmlFor="password">Department</Label>
          </div>
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Select your department" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">
                  College of Computer Studies
                </SelectItem>
                <SelectItem value="banana">
                  College of Business and Management
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full">
          Continue
        </Button>
      </div>
    </form>
  );
}
