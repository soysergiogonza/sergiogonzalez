"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const BlogEditor = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [session, setSession] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState({
    title: "",
    content: "",
    id: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: currentPost.content,
    onUpdate: ({ editor }) => {
      setCurrentPost((prev) => ({
        ...prev,
        content: editor.getHTML(),
      }));
    },
  });

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        fetchPosts();
      } else {
        router.push("/");
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        router.push("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error:", error);
      return;
    }

    setPosts(data || []);
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) console.error("Error:", error);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleSave = async () => {
    if (!currentPost.title || !editor?.getHTML()) return;

    const newPost = {
      title: currentPost.title,
      content: editor.getHTML(),
      user_id: session.user.id,
    };

    if (currentPost.id) {
      const { error } = await supabase
        .from("posts")
        .update(newPost)
        .eq("id", currentPost.id);

      if (error) {
        console.error("Error:", error);
        return;
      }
    } else {
      const { error } = await supabase.from("posts").insert(newPost);

      if (error) {
        console.error("Error:", error);
        return;
      }
    }

    fetchPosts();
    setCurrentPost({ title: "", content: "", id: null });
    editor?.commands.setContent("");
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      console.error("Error:", error);
      return;
    }

    fetchPosts();
  };

  if (!session) {
    return (
      <div>
        <button onClick={handleLogin}>Iniciar Sesión con GitHub</button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Blog Admin</h1>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>

      {!isEditing ? (
        <div>
          <button
            onClick={() => {
              setIsEditing(true);
              setCurrentPost({ title: "", content: "", id: null });
              editor?.commands.setContent("");
            }}
          >
            Nuevo Post
          </button>

          <div>
            {posts.map((post) => (
              <div key={post.id}>
                <h3>{post.title}</h3>
                <button
                  onClick={() => {
                    setCurrentPost(post);
                    setIsEditing(true);
                    editor?.commands.setContent(post.content);
                  }}
                >
                  Editar
                </button>
                <button onClick={() => handleDelete(post.id)}>Eliminar</button>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <input
            type='text'
            placeholder='Título del post'
            value={currentPost.title}
            onChange={(e) =>
              setCurrentPost((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />

          <div>
            <button onClick={() => editor?.chain().focus().toggleBold().run()}>
              Negrita
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleItalic().run()}
            >
              Cursiva
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
            >
              Lista
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            >
              Lista Numerada
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            >
              Código
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            >
              Cita
            </button>
            <button onClick={() => editor?.chain().focus().undo().run()}>
              Deshacer
            </button>
            <button onClick={() => editor?.chain().focus().redo().run()}>
              Rehacer
            </button>

            <EditorContent editor={editor} />
          </div>

          <div>
            <button onClick={handleSave}>Guardar</button>
            <button
              onClick={() => {
                setIsEditing(false);
                setCurrentPost({ title: "", content: "", id: null });
                editor?.commands.setContent("");
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;
