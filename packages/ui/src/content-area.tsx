import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "./card";

export const ContentArea: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => <Card className="w-full">{children}</Card>;

export const ContentAreaHeader: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => <CardHeader className="px-8 py-6">{children}</CardHeader>;

export const ContentAreaTitle: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => <CardTitle className="text-2xl font-semibold">{children}</CardTitle>;

export const ContentAreaDescription: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => <p className="mt-1 text-sm text-gray-500">{children}</p>;

export const ContentSubHeader: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => <div className="border-b px-8 py-4">{children}</div>;

export const ContentAreaContainer: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => <CardContent className="space-y-4 px-8 py-6">{children}</CardContent>;
