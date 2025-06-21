'use client';
import { useState } from 'react';
import { Command, CommandGroup, CommandItem, CommandList, CommandInput } from 'cmdk';
import { useRouter } from 'next/navigation';
import styles from './CommandMenu.module.css';

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <button onClick={() => setOpen(true)} className={styles.button}>
        Cmd
      </button>
      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <Command className={styles.menu} onKeyDown={(e) => e.stopPropagation()}>
            <CommandInput
              placeholder="Type a command or search..."
              className={styles.input}
            />
            <CommandList>
              <CommandGroup heading="Navigation">
                <CommandItem
                  onSelect={() => {
                    router.push('/');
                    setOpen(false);
                  }}
                >
                  Home
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    router.push('/blog');
                    setOpen(false);
                  }}
                >
                  Blog
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </>
  );
}
