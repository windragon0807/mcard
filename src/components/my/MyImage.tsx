import { ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { getAuth, updateProfile } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { useSetRecoilState } from 'recoil'

import { app, storage, store } from '@remote/firebase'
import useUser from '@hooks/auth/useUser'
import { COLLECTIONS } from '@constants'
import { userAtom } from '@atoms/user'

type Props = {
  size?: number
  mode?: 'default' | 'upload'
}

export default function MyImage({ size = 40, mode = 'default' }: Props) {
  const user = useUser()
  const setUser = useSetRecoilState(userAtom)

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const currentUser = getAuth(app).currentUser

    if (files == null || user == null || currentUser == null) {
      return
    }

    const fileName = files[0].name
    const storageRef = ref(storage, `users/${user.uid}/${fileName}`)

    /* 이미지를 Firebase Storage에 업로드하고, Storage Reference를 받아온다. */
    const uploaded = await uploadBytes(storageRef, files[0])

    /* Storage Reference를 이용해 이미지의 다운로드 URL을 받아온다. */
    const downloadUrl = await getDownloadURL(uploaded.ref)

    /* Firebase Auth의 프로필 사진을 업데이트한다. */
    await updateProfile(currentUser, {
      photoURL: downloadUrl,
    })

    /* Firestore Store의 유저 정보를 업데이트한다. */
    await updateDoc(doc(collection(store, COLLECTIONS.USER), currentUser.uid), {
      photoURL: downloadUrl,
    })

    /* Recoil의 유저 정보를 업데이트한다. */
    setUser({
      ...user,
      photoURL: downloadUrl,
    })
  }

  return (
    <Container>
      <img
        src={
          user?.photoURL ||
          'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-64.png'
        }
        alt="유저의 이미지"
        width={size}
        height={size}
      />
      {mode === 'upload' ? (
        <input type="file" accept="image/*" onChange={handleUploadImage} />
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & img {
    border-radius: 100%;
  }

  & input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`
