/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-shadow */
import { FormControl, FormLabel, FormHelperText, FormErrorMessage } from '@chakra-ui/react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

export interface IEditor {
  data?: string;
  height?: string;
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  onChange?: (data: string) => void;
  onBlur?: (data: string | undefined) => void;
  onInit?: (editor: ClassicEditor) => void;
  disabled?: boolean;
}

function Editor({
  data,
  height,
  onInit,
  onChange,
  onBlur,
  label,
  helperText,
  required,
  error,
  disabled,
}: IEditor) {
  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel>
          {label}
          {required && <span style={{ color: 'black' }}>&nbsp;*</span>}
        </FormLabel>
      )}

      <CKEditor
        editor={ClassicEditor}
        data={data}
        disabled={disabled}
        config={{
          removePlugins: ['EasyImage', 'ImageUpload', 'MediaEmbed'],
        }}
        onReady={(editor) => {
          if (editor?.editing?.view?.document) {
            const rootElement = editor.editing.view.document.getRoot();

            if (rootElement) {
              editor.editing.view.change((writer) =>
                writer.setStyle('height', `${height ?? 200}px`, rootElement)
              );
            }
          }

          if (onInit) {
            onInit(editor);
          }
        }}
        onChange={(_event, editor) => {
          const data = editor.getData();
          if (onChange) {
            onChange(data);
          }
        }}
        onBlur={(_event, editor) => {
          const data = editor.getData();
          if (onChange) {
            onChange(data);
          }
          if (onBlur) {
            onBlur(data);
          }
        }}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}

export default Editor;
