"use client";
import React, { useState } from "react";
import { Button, Input, Container, Stack, Card } from "../index";
import styles from "./ComponentShowcase.module.css";

export const ComponentShowcase: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (inputError) setInputError("");
  };

  const validateInput = () => {
    if (!inputValue.trim()) {
      setInputError("This field is required");
    }
  };

  return (
    <Container maxWidth="xl" padding="lg">
      <Stack spacing="xl">
        {/* Header Section */}
        <Stack spacing="md">
          <h1 className="text-4xl font-bold font-heading text-primary-dark">
            Minimal Design System
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed">
            A clean, minimal design system focused on essential functionality
            without visual distractions.
          </p>
        </Stack>

        {/* Minimal Color Palette Section */}
        <Card>
          <Stack spacing="lg">
            <h2 className="text-2xl font-semibold font-heading text-primary-dark">
              Essential Colors Only
            </h2>

            <Stack spacing="md">
              <h3 className="text-lg font-medium text-primary-dark">
                Primary Colors
              </h3>
              <Stack direction="row" spacing="sm" wrap>
                <div className={styles.colorSwatch}>
                  <div
                    className="bg-primary-dark rounded-lg"
                    style={{ height: "60px" }}
                  ></div>
                  <span className="text-sm text-neutral-600">Primary Dark</span>
                </div>
                <div className={styles.colorSwatch}>
                  <div
                    className="bg-primary-light border rounded-lg"
                    style={{ height: "60px" }}
                  ></div>
                  <span className="text-sm text-neutral-600">
                    Primary Light
                  </span>
                </div>
              </Stack>
            </Stack>

            <Stack spacing="md">
              <h3 className="text-lg font-medium text-primary-dark">
                Neutral Grays
              </h3>
              <Stack direction="row" spacing="sm" wrap>
                <div className={styles.colorSwatch}>
                  <div
                    className="bg-neutral-100 rounded-lg"
                    style={{ height: "60px" }}
                  ></div>
                  <span className="text-sm text-neutral-600">Neutral 100</span>
                </div>
                <div className={styles.colorSwatch}>
                  <div
                    className="bg-neutral-200 rounded-lg"
                    style={{ height: "60px" }}
                  ></div>
                  <span className="text-sm text-neutral-600">Neutral 200</span>
                </div>
                <div className={styles.colorSwatch}>
                  <div
                    className="bg-neutral-300 rounded-lg"
                    style={{ height: "60px" }}
                  ></div>
                  <span className="text-sm text-neutral-600">Neutral 300</span>
                </div>
              </Stack>
            </Stack>

            <Stack spacing="md">
              <h3 className="text-lg font-medium text-primary-dark">
                Accent Color - Essential Only
              </h3>
              <Stack direction="row" spacing="sm" wrap>
                <div className={styles.colorSwatch}>
                  <div
                    className="bg-accent rounded-lg"
                    style={{ height: "60px" }}
                  ></div>
                  <span className="text-sm text-neutral-600">Accent Blue</span>
                </div>
              </Stack>
            </Stack>
          </Stack>
        </Card>

        {/* Typography Section */}
        <Card>
          <Stack spacing="lg">
            <h2 className="text-2xl font-semibold font-heading text-primary-dark">
              Typography Scale
            </h2>

            <Stack spacing="md">
              <div className="text-5xl font-bold font-heading text-primary-dark">
                Large Heading
              </div>
              <div className="text-3xl font-semibold font-heading text-primary-dark">
                Section Heading
              </div>
              <div className="text-2xl font-medium font-heading text-primary-dark">
                Subsection
              </div>
              <div className="text-xl font-medium font-heading text-primary-dark">
                Card Title
              </div>
              <div className="text-base font-body text-primary-dark leading-relaxed">
                Body text - This is the default body text style using neutral
                colors and optimal readability.
              </div>
              <div className="text-sm font-body text-neutral-600">
                Small text - Used for captions, helper text, and secondary
                information.
              </div>
            </Stack>
          </Stack>
        </Card>

        {/* Minimal Buttons Section */}
        <Card>
          <Stack spacing="lg">
            <h2 className="text-2xl font-semibold font-heading text-primary-dark">
              Essential Button Components
            </h2>

            <Stack spacing="md">
              <h3 className="text-lg font-medium text-primary-dark">
                Button Variants - Minimal Only
              </h3>
              <Stack direction="row" spacing="md" wrap>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </Stack>
            </Stack>

            <Stack spacing="md">
              <h3 className="text-lg font-medium text-primary-dark">
                Button Sizes
              </h3>
              <Stack direction="row" spacing="md" align="center" wrap>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </Stack>
            </Stack>

            <Stack spacing="md">
              <h3 className="text-lg font-medium text-primary-dark">
                Button States
              </h3>
              <Stack direction="row" spacing="md" wrap>
                <Button loading></Button>
                <Button disabled>Disabled</Button>
                <Button iconLeft={<span>→</span>}>With Icon</Button>
                <Button fullWidth>Full Width Button</Button>
              </Stack>
            </Stack>
          </Stack>
        </Card>

        {/* Minimal Input Section */}
        <Card>
          <Stack spacing="lg">
            <h2 className="text-2xl font-semibold font-heading text-primary-dark">
              Clean Input Components
            </h2>

            <Stack spacing="md">
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                helperText="Simple, clean input styling."
                fullWidth
              />

              <Input
                label="Username"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={validateInput}
                error={inputError}
                placeholder="Choose a username"
                iconLeft={<span>@</span>}
                fullWidth
              />

              <Stack direction="row" spacing="md">
                <Input size="sm" placeholder="Small" />
                <Input size="md" placeholder="Medium" />
                <Input size="lg" placeholder="Large" />
              </Stack>
            </Stack>
          </Stack>
        </Card>

        {/* Minimal Card Variants Section */}
        <Card>
          <Stack spacing="lg">
            <h2 className="text-2xl font-semibold font-heading text-primary-dark">
              Essential Card Components
            </h2>

            <Stack direction="row" spacing="md" wrap>
              <Card
                variant="default"
                padding="md"
                className={styles.cardExample}
              >
                <Stack spacing="sm">
                  <h3 className="text-lg font-medium text-primary-dark">
                    Default Card
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Clean card with minimal shadow and neutral styling.
                  </p>
                </Stack>
              </Card>

              <Card
                variant="bordered"
                padding="md"
                className={styles.cardExample}
              >
                <Stack spacing="sm">
                  <h3 className="text-lg font-medium text-primary-dark">
                    Bordered Card
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Simple border instead of shadow for ultra-clean look.
                  </p>
                </Stack>
              </Card>

              <Card variant="flat" padding="md" className={styles.cardExample}>
                <Stack spacing="sm">
                  <h3 className="text-lg font-medium text-primary-dark">
                    Flat Card
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Minimal card with neutral background and no shadows.
                  </p>
                </Stack>
              </Card>

              <Card
                variant="flat"
                padding="md"
                clickable
                onClick={() => alert("Clean interaction!")}
                className={styles.cardExample}
              >
                <Stack spacing="sm">
                  <h3 className="text-lg font-medium text-primary-dark">
                    Interactive Card
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Subtle hover feedback without animations.
                  </p>
                </Stack>
              </Card>
            </Stack>
          </Stack>
        </Card>

        {/* Layout Examples */}
        <Card>
          <Stack spacing="lg">
            <h2 className="text-2xl font-semibold font-heading text-primary-dark">
              Clean Layout Components
            </h2>

            <Stack spacing="md">
              <h3 className="text-lg font-medium text-primary-dark">
                Stack Component
              </h3>

              <div className="p-4 bg-neutral-50 rounded-lg">
                <h4 className="text-base font-medium mb-2 text-primary-dark">
                  Vertical Stack
                </h4>
                <Stack spacing="sm">
                  <div className="p-2 bg-neutral-800 text-primary-light rounded text-center">
                    Item 1
                  </div>
                  <div className="p-2 bg-neutral-800 text-primary-light rounded text-center">
                    Item 2
                  </div>
                  <div className="p-2 bg-neutral-800 text-primary-light rounded text-center">
                    Item 3
                  </div>
                </Stack>
              </div>

              <div className="p-4 bg-neutral-50 rounded-lg">
                <h4 className="text-base font-medium mb-2 text-primary-dark">
                  Horizontal Stack
                </h4>
                <Stack direction="row" spacing="sm">
                  <div className="p-2 bg-neutral-300 text-primary-dark rounded text-center flex-1">
                    Item 1
                  </div>
                  <div className="p-2 bg-neutral-300 text-primary-dark rounded text-center flex-1">
                    Item 2
                  </div>
                  <div className="p-2 bg-neutral-300 text-primary-dark rounded text-center flex-1">
                    Item 3
                  </div>
                </Stack>
              </div>
            </Stack>
          </Stack>
        </Card>

        {/* Minimal Design Principles */}
        <Card>
          <Stack spacing="lg">
            <h2 className="text-2xl font-semibold font-heading text-primary-dark">
              Minimal Design Principles
            </h2>

            <Stack spacing="md">
              <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <strong className="text-primary-dark">
                  Essential Colors Only:
                </strong>
                <span className="text-neutral-600 ml-2">
                  Primary, neutral grays, and single accent color for critical
                  actions.
                </span>
              </div>

              <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <strong className="text-primary-dark">
                  No Unnecessary CTAs:
                </strong>
                <span className="text-neutral-600 ml-2">
                  Removed success, warning, danger variants. Clean interaction
                  focus.
                </span>
              </div>

              <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <strong className="text-primary-dark">Minimal Effects:</strong>
                <span className="text-neutral-600 ml-2">
                  Ultra-light shadows, no animations, color-only hover states.
                </span>
              </div>

              <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <strong className="text-primary-dark">Content First:</strong>
                <span className="text-neutral-600 ml-2">
                  Clean typography hierarchy with optimal readability.
                </span>
              </div>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};
