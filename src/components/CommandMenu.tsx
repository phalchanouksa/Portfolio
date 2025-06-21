'use client';
import { useState } from 'react';
import { Command, CommandGroup, CommandItem, CommandList, CommandInput } from 'cmdk';
import { useRouter } from 'next/navigation';

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-primary px-3 py-2 text-white shadow-lg"
      >
        Cmd
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setOpen(false)}
        >
          <Command
            className="w-72 max-w-full rounded-md bg-white p-2 shadow-xl"
            onKeyDown={(e) => e.stopPropagation()}
          >
            <CommandInput placeholder="Type a command or search..." className="mb-2 w-full rounded border px-2 py-1" />
            <CommandList>
              <CommandGroup heading="Navigation">
                <CommandItem onSelect={() => { router.push('/'); setOpen(false); }}>Home</CommandItem>
                <CommandItem onSelect={() => { router.push('/blog'); setOpen(false); }}>Blog</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </>
  );
}
