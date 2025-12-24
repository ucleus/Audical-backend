<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class UserController extends Controller
{
    /**
     * Get all roles.
     */
    public function getRoles(): JsonResponse
    {
        return response()->json(Role::all());
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $users = User::with('role')->latest()->paginate(15);
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('profile_photo')) {
            $data['profile_photo_path'] = $this->uploadAndResizeImage($request->file('profile_photo'));
        }

        $user = User::create($data);
        
        return response()->json([
            'message' => 'User created successfully.',
            'data' => $user->load('role'),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): JsonResponse
    {
        return response()->json($user->load('role'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('profile_photo')) {
            // Delete old photo
            if ($user->profile_photo_path) {
                Storage::disk('public')->delete($user->profile_photo_path);
            }
            $data['profile_photo_path'] = $this->uploadAndResizeImage($request->file('profile_photo'));
        }

        $user->update($data);

        return response()->json([
            'message' => 'User updated successfully.',
            'data' => $user->load('role'),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): JsonResponse
    {
        if ($user->id === auth()->id()) {
            return response()->json(['message' => 'You cannot delete yourself.'], 403);
        }

        if ($user->profile_photo_path) {
            Storage::disk('public')->delete($user->profile_photo_path);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully.']);
    }

    /**
     * Helper to upload and resize image.
     */
    private function uploadAndResizeImage($file): string
    {
        $manager = new ImageManager(new Driver());
        $image = $manager->read($file);
        
        // Industry standard profile size: 400x400
        $image->cover(400, 400);
        
        $filename = 'profile-photos/' . uniqid() . '.jpg';
        $path = storage_path('app/public/' . $filename);
        
        // Ensure directory exists
        if (!file_exists(dirname($path))) {
            mkdir(dirname($path), 0755, true);
        }
        
        $image->save($path);
        
        return $filename;
    }
}
