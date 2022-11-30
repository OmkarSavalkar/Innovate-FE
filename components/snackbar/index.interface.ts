export interface IProps {
  isSnackbarOpen: boolean;
  message?: string;
  messageType?: string;
  handleSnackbarClose(): void;
}
