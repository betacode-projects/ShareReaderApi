from google.cloud import storage

"""
Google Storage リファレンス
https://cloud.google.com/storage/docs/reference/libraries?hl=ja#client-libraries-install-python

"""

def main():
  storage_client = storage.Client()
  bucket_name = ""
