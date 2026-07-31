import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@aurora-ui/utils";
import { PlusIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon } from "@aurora-ui/icons";
import { Button } from "../primitives/Button/Button";
import { Card } from "../primitives/Layout/Layout";

export interface KanbanCard {
  id: string;
  title: string;
  content: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

export interface KanbanBoardProps {
  initialColumns?: KanbanColumn[];
  className?: string;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  initialColumns = [
    {
      id: "col-todo",
      title: "To Do",
      cards: [
        { id: "c1", title: "Architectural Review", content: "Audit design tokens and layered spacing system." },
        { id: "c2", title: "Write Documentation", content: "Write comprehensive Next.js 15 App router docs." }
      ]
    },
    {
      id: "col-in-progress",
      title: "In Progress",
      cards: [
        { id: "c3", title: "Build DataGrid flagship", content: "Optimize TanStack table virtualization." }
      ]
    },
    {
      id: "col-done",
      title: "Completed",
      cards: [
        { id: "c4", title: "Monorepo Setup", content: "Initialize workspace with pnpm workspaces." }
      ]
    }
  ],
  className,
}) => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);

  const addColumn = () => {
    const newColId = `col-${Math.random().toString(36).substr(2, 9)}`;
    const newCol: KanbanColumn = {
      id: newColId,
      title: "New Column",
      cards: []
    };
    setColumns([...columns, newCol]);
  };

  const deleteColumn = (colId: string) => {
    setColumns(columns.filter((col) => col.id !== colId));
  };

  const addCard = (colId: string) => {
    const newCardId = `card-${Math.random().toString(36).substr(2, 9)}`;
    const newCard: KanbanCard = {
      id: newCardId,
      title: "New Task",
      content: "Task description goes here..."
    };
    setColumns(
      columns.map((col) => {
        if (col.id === colId) {
          return { ...col, cards: [...col.cards, newCard] };
        }
        return col;
      })
    );
  };

  const deleteCard = (colId: string, cardId: string) => {
    setColumns(
      columns.map((col) => {
        if (col.id === colId) {
          return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
        }
        return col;
      })
    );
  };

  const moveCard = (cardId: string, fromColId: string, direction: "left" | "right") => {
    const fromIndex = columns.findIndex((col) => col.id === fromColId);
    if (fromIndex === -1) return;

    const toIndex = direction === "left" ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= columns.length) return;

    const fromCol = columns[fromIndex]!;
    const cardToMove = fromCol.cards.find((c) => c.id === cardId);
    if (!cardToMove) return;

    setColumns(
      columns.map((col, index) => {
        if (index === fromIndex) {
          return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
        }
        if (index === toIndex) {
          return { ...col, cards: [...col.cards, cardToMove] };
        }
        return col;
      })
    );
  };

  return (
    <div className={cn("space-y-6 w-full overflow-x-auto pb-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[var(--aurora-fg-base)]">Aurora Kanban Workspace</h3>
        <Button onClick={addColumn} size="sm" variant="soft" leadingIcon={<PlusIcon size={14} />}>
          Add Column
        </Button>
      </div>

      <div className="flex gap-4 items-start min-w-[900px]">
        <AnimatePresence>
          {columns.map((col, colIndex) => (
            <motion.div
              key={col.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-80 shrink-0 bg-[var(--aurora-bg-surface-hover)] border border-[var(--aurora-border-subtle)] rounded-[var(--aurora-radius-xl)] p-4 flex flex-col gap-4 max-h-[600px]"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[var(--aurora-fg-base)]">{col.title}</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => deleteColumn(col.id)}
                    className="text-[var(--aurora-fg-subtle)] hover:text-red-500 p-1"
                  >
                    <TrashIcon size={14} />
                  </button>
                  <button
                    onClick={() => addCard(col.id)}
                    className="text-[var(--aurora-fg-subtle)] hover:text-[var(--aurora-primary)] p-1"
                  >
                    <PlusIcon size={14} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 overflow-y-auto pr-1">
                <AnimatePresence>
                  {col.cards.map((card) => (
                    <motion.div
                      key={card.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <Card className="p-3 bg-[var(--aurora-bg-surface)] hover:border-[var(--aurora-primary)] group select-none">
                        <div className="flex justify-between items-start">
                          <h5 className="text-sm font-bold text-[var(--aurora-fg-base)]">{card.title}</h5>
                          <button
                            onClick={() => deleteCard(col.id, card.id)}
                            className="text-[var(--aurora-fg-subtle)] hover:text-red-500 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                        <p className="text-xs text-[var(--aurora-fg-muted)] mt-1.5">{card.content}</p>

                        {/* Navigation controls for moving cards across columns */}
                        <div className="flex justify-end gap-1.5 mt-3 pt-2.5 border-t border-[var(--aurora-border-subtle)]">
                          {colIndex > 0 && (
                            <button
                              onClick={() => moveCard(card.id, col.id, "left")}
                              className="text-[var(--aurora-fg-subtle)] hover:text-[var(--aurora-primary)] p-0.5"
                            >
                              <ChevronLeftIcon size={14} />
                            </button>
                          )}
                          {colIndex < columns.length - 1 && (
                            <button
                              onClick={() => moveCard(card.id, col.id, "right")}
                              className="text-[var(--aurora-fg-subtle)] hover:text-[var(--aurora-primary)] p-0.5"
                            >
                              <ChevronRightIcon size={14} />
                            </button>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {col.cards.length === 0 && (
                  <div className="text-center py-8 border border-dashed border-[var(--aurora-border-subtle)] rounded-[var(--aurora-radius-lg)] text-xs text-[var(--aurora-fg-subtle)]">
                    Empty column. Add card above.
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default KanbanBoard;
